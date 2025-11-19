import admin from 'firebase-admin';
import fs from 'fs';
import cron from 'node-cron';
import path from 'path';

import UserRepository from '../../../graphql/service/User/repository/UserRepository';

const serviceAccountPath = path.join(__dirname, '..', '..', '..', '..', 'firebase.json');
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));

class FCMService {
    userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
        });
    }

    async sendNotificationsForActivity(_courseId: string, _activityId: string, _rubricVersionId: string) {
        console.log('sendNotificationsForActivity is disabled as student/course related features are removed.');
        return true;
    }

    async sendNotificationToDevice(deviceToken: string, title: string, body: string) {
        const message = {
            notification: {
                body,
                title,
            },
            token: deviceToken,
        };

        try {
            const response = await admin.messaging().send(message);
            console.log('Successfully sent message:', response);
            return response;
        } catch (error) {
            console.error('Error sending message:', error);
            throw error;
        }
    }

    async sendKeepAliveNotification() {
        console.log('sendKeepAliveNotification is disabled as student/course related features are removed.');
        return;
    }

    // startKeepAliveSchedule() {
    //     this.keepAliveScheduled = true;
    //     cron.schedule('*/5 * * * *', () => {
    //         this.sendKeepAliveNotification().then(() => {
    //             console.log('Keep-alive notifications sent.');
    //         }).catch((error) => {
    //             console.error('Error sending keep-alive notifications:', error);
    //         });
    //     });
    // }
}

const userRepository = new UserRepository();
const fcmService = new FCMService(userRepository);

export default fcmService;
