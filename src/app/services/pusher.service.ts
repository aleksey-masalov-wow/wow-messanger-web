import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
declare const Pusher: any;

@Injectable()
export class PusherService {
    private readonly CONVERSATION_CHANNEL_NAME_MAIN_CHAT = 'main-chat';
    private readonly CONVERSATION_CHANNEL_NAME_MANAGER_CHAT = 'manager-chat';
    private readonly CONVERSATION_CHANNEL_NAME_APPOINTMENT_CHAT = 'appointment-chat';
    private readonly CONVERSATION_CHANNEL_NAME_EDUCATION_CHAT = 'education-chat';
    private readonly CONVERSATION_CHANNEL_NAME_MEDICATION_CHAT = 'medication-chat';

    pusher: any;
    channelMainChat: any;
    channelManagerChat: any;
    channelAppointmentChat: any;
    channelEducationChat: any;
    channelMedicationChat: any;

    constructor(private http: HttpClient) {
        this.pusher = new Pusher(environment.pusher.key, {
            cluster: environment.pusher.cluster,
            encrypted: true
        });

        this.channelMainChat = this.pusher.subscribe(this.CONVERSATION_CHANNEL_NAME_MAIN_CHAT);
        this.channelManagerChat = this.pusher.subscribe(this.CONVERSATION_CHANNEL_NAME_MANAGER_CHAT);
        this.channelAppointmentChat = this.pusher.subscribe(this.CONVERSATION_CHANNEL_NAME_APPOINTMENT_CHAT);
        this.channelEducationChat = this.pusher.subscribe(this.CONVERSATION_CHANNEL_NAME_EDUCATION_CHAT);
        this.channelMedicationChat = this.pusher.subscribe(this.CONVERSATION_CHANNEL_NAME_MEDICATION_CHAT);
    }
}
