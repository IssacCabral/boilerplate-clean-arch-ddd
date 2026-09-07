import {
  PublishQueueMessageInput,
  QueuePublisher,
} from "../../../application/ports/queue/queue-publisher.port";

export class BullQueuePublisher implements QueuePublisher {
  publish(_input: PublishQueueMessageInput): Promise<void> {
    return Promise.resolve();
  }
}
