import { Task } from '../models/task.model';

describe('Task', () => {
  let service: Task;

  beforeEach(() => {
    service = {} as Task;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
