export interface PublishQueueMessageInput {
  queueName: string;
  message: string;
}

export interface QueuePublisher {
  publish(input: PublishQueueMessageInput): Promise<void>;
}
