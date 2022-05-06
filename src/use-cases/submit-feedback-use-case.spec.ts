import { SubmitFeedbackUseCase } from './submit-feedback-use-case';

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

describe('Submit feedback', () => {
  const submitFeedback = new SubmitFeedbackUseCase(
    { create: createFeedbackSpy },
    { sendMail: sendMailSpy },
  );

  it('Should be able to submit a feedback', async () => {
    await expect(
      submitFeedback.execute({
        type: 'BUG',
        comment: 'example comment',
        screenshot: 'data:image/png;base64,jdosajdoasjdoasjdoasjdoasjdoas',
      }),
    ).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it('Should not be able submit feedback without type', async () => {
    await expect(
      submitFeedback.execute({
        type: '',
        comment: 'example comment',
        screenshot: 'data:image/png;base64,jdosajdoasjdoasjdoasjdoasjdoas',
      }),
    ).rejects.toThrow();
  });

  it('Should not be able submit feedback without comment', async () => {
    await expect(
      submitFeedback.execute({
        type: 'BIG',
        comment: '',
        screenshot: 'data:image/png;base64,jdosajdoasjdoasjdoasjdoasjdoas',
      }),
    ).rejects.toThrow();
  });

  it('Should not be able submit feedback with an invalid screenshot', async () => {
    await expect(
      submitFeedback.execute({
        type: 'BIG',
        comment: 'teste',
        screenshot: '123',
      }),
    ).rejects.toThrow();
  });
});
