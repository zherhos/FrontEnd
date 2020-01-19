import { Task } from './task';

describe('Task', () => {
  it('should create an instance of Task class', () => {
    expect(new Task()).toBeTruthy();
  });

  it('should store the parameters without modifications', () =>{
    let task: Task = new Task();

    task = {
      id: 1,
      description: 'This is a test!',
      status: 'Pending'
    };

    expect(task.id).toEqual(1);
    expect(task.description).toEqual('This is a test!');
    expect(task.status).toEqual('Pending');
  });
});
