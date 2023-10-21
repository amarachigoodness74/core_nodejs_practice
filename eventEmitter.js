const EventEmitter = require('events');

const eventEmitter = new EventEmitter();

const tasks = {
  create: 'CREATE',
  update: 'UPDATE',
  delete: 'DELETE',
}

eventEmitter.on('start', () => {
  console.log('EventEmitter just started emitting events');
});

eventEmitter.on('about-to-complete', () => {
  console.log('EventEmitter is about to wrap up emitting events');
});

eventEmitter.on('perform', (task) => {
  if(task === tasks.create) {
    console.log('Task created');
  } else if(task === tasks.update) {
    console.log('Task udated');
  } else {
    console.log('Task deleted');
  }
  
});

eventEmitter.on('end', () => {
  console.log('EventEmitter just finished emitting events');
});


eventEmitter.emit('start');
eventEmitter.emit('about-to-complete');
eventEmitter.emit('perform', tasks.create);
eventEmitter.emit('perform', tasks.update);
eventEmitter.emit('perform', tasks.delete);
eventEmitter.emit('end');