import express from 'express';

import { SubmitFeedbackUseCase } from './use-cases/submit-feedback-use-case';
import { PrismaFeedBacksRepository } from './repositories/prisma/prisma-feedbacks-repository';
import { NodemailerService } from './services/nodemailer/nodemailer-mail-service';

export const routes = express.Router();

routes.post('/feedbacks', async (req, res) => {
  const { type, comment, screenshot } = req.body;

  const prismaFeedBacksRepository = new PrismaFeedBacksRepository();
  const nodemailerService = new NodemailerService();
  const submitFeedbackUseCase = new SubmitFeedbackUseCase(
    prismaFeedBacksRepository,
    nodemailerService,
  );

  await submitFeedbackUseCase.execute({
    type,
    comment,
    screenshot,
  });

  return res.status(201).send();
});
