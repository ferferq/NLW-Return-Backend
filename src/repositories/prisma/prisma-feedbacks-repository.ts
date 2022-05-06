import { prisma } from '../../prisma';
import {
  feedbackCreateData,
  FeedbacksRepository,
} from '../feedbacks-repository';

export class PrismaFeedBacksRepository implements FeedbacksRepository {
  async create({
    type,
    comment,
    screenshot,
  }: feedbackCreateData): Promise<void> {
    await prisma.feedback.create({
      data: {
        type,
        comment,
        screenshot,
      },
    });
  }
}
