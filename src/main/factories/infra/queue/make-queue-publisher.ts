import { QueuePublisher } from "../../../../application/ports/queue/queue-publisher.port";
import { BullQueuePublisher } from "../../../../infra/adapters/queue/bull-queue-publisher.adapter";

export function makeQueuePublisher(): QueuePublisher {
  return new BullQueuePublisher();
}
