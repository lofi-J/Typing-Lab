const isString = (item: any) => typeof item === 'string';

const css = <T>(className: T): string => {
  let type: string = '';
  if (Array.isArray(className)) {
    if (className.every(isString)) {
      type = 'array';
    } else {
      type = 'error_not_string';
    }
  } else if (typeof className === 'string') {
    type = 'string';
  }
  
  switch (type) {
    case 'array':
      return className.join(' ');
    case 'string':
      return className as string;
    default:
      throw new Error('className must be a string | string[]');
  }
}

export default css;