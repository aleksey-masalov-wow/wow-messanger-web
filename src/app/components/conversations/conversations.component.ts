import { Component, OnInit } from "@angular/core";
import { ApiService } from "../../services/api.service";
import { AuthService } from "../../services/auth.service";
import { PusherService } from "../../services/pusher.service";
import {FormsModule} from '@angular/forms'
import { environment } from "../../../environments/environment";

@Component({
  selector: 'app-conversations',
  templateUrl: './conversations.component.html',
  styleUrls: ['./conversations.component.css']
})
export class ConversationsComponent implements OnInit {

  public currentUserId;
  public currentMessage;
  public messages = [];
  public errors = [];
  public channelType;
  public channelMessages = [];

  private readonly CONVERSATION_CHANNEL_NAME_MAIN_CHAT = 'main-chat';
  private readonly CONVERSATION_CHANNEL_NAME_MANAGER_CHAT = 'manager-chat';
  private readonly CONVERSATION_CHANNEL_NAME_APPOINTMENT_CHAT = 'appointment-chat';
  private readonly CONVERSATION_CHANNEL_NAME_EDUCATION_CHAT = 'education-chat';
  private readonly CONVERSATION_CHANNEL_NAME_MEDICATION_CHAT = 'medication-chat';
  private readonly CONVERSATION_EVENT_NAME = 'chat-updated';

  constructor(private api: ApiService,
              private pusherService: PusherService,
              private auth: AuthService) {
    this.currentUserId = this.auth.hasIdentity() ? this.auth.getIdentity().id : null;
  }

  ngOnInit() {
    this.refreshMessages();

    this.pusherService.channelMainChat.bind(this.CONVERSATION_EVENT_NAME, () => {
      this.refreshMessages(this.CONVERSATION_CHANNEL_NAME_MAIN_CHAT);
    });

    this.pusherService.channelManagerChat.bind(this.CONVERSATION_EVENT_NAME, () => {
      this.refreshMessages(this.CONVERSATION_CHANNEL_NAME_MANAGER_CHAT);
    });

    this.pusherService.channelAppointmentChat.bind(this.CONVERSATION_EVENT_NAME, () => {
      this.refreshMessages(this.CONVERSATION_CHANNEL_NAME_APPOINTMENT_CHAT);
    });

    this.pusherService.channelEducationChat.bind(this.CONVERSATION_EVENT_NAME, () => {
      this.refreshMessages(this.CONVERSATION_CHANNEL_NAME_EDUCATION_CHAT);
    });

    this.pusherService.channelMedicationChat.bind(this.CONVERSATION_EVENT_NAME, () => {
      this.refreshMessages(this.CONVERSATION_CHANNEL_NAME_MEDICATION_CHAT);
    });
  }

  get mainChatChannelMessages(){
    return this.messages.filter((message) => {
      return message.channel == this.CONVERSATION_CHANNEL_NAME_MAIN_CHAT;
    });
  }

  get managerChatChannelMessages(){
    return this.messages.filter((message) => {
      return message.channel == this.CONVERSATION_CHANNEL_NAME_MANAGER_CHAT;
    });
  }

  get appointmentChatChannelMessages(){
    return this.messages.filter((message) => {
      return message.channel == this.CONVERSATION_CHANNEL_NAME_APPOINTMENT_CHAT;
    });
  }

  get educationChatChannelMessages(){
    return this.messages.filter((message) => {
      return message.channel == this.CONVERSATION_CHANNEL_NAME_EDUCATION_CHAT;
    });
  }

  get medicationChatChannelMessages(){
    return this.messages.filter((message) => {
      return message.channel == this.CONVERSATION_CHANNEL_NAME_MEDICATION_CHAT;
    });
  }

  public onSubmitMessage(){
    this.sendMessage(this.channelType, this.currentMessage);
    this.currentMessage = '';
  }

  public onActivateChannel(channel){
    this.refreshChannel(channel);
  }

  public isActiveChannel(channel){
    return this.channelType == channel;
  }

  private refreshMessages(channel = null) {
    this.api.getMessages().subscribe((messages) => {
      this.messages = messages;

      if(channel){
        this.refreshChannel(channel);
      }
    }, (e) => {
      console.log(e);
    });
  }

  private refreshChannel(channel) {
    this.channelType = channel;

    if(this.messages.length){
      this.channelMessages = this.messages.filter((message) => {
        return message.channel == channel;
      });
    }
  }

  sendMessage(channel, message) {
      this.api.sendMessage(channel, message).subscribe(() => {
          this.refreshMessages(channel);
      }, (e) => {
        console.log(e);
      });
  }
}
