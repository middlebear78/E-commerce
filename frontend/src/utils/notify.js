import toast, { Toaster } from 'react-hot-toast';

class Notify {
  static success(message, options = {}) {
    toast.success(message, {
      duration: options.duration || 5000,
      position: options.position || 'top-center',
      style: options.style || {},
      className: options.className || "",
      icon: options.icon || '👏',
    });
  }

  static error(message, options = {}) {
    toast.error(message, {
      duration: options.duration || 5000,
      position: options.position || 'top-center',
      style: options.style || {},
      className: options.className || "",
      icon: options.icon || '',
    });
  }

  static info(message, options = {}) {
    toast(message, {
      duration: options.duration || 5000,
      position: options.position || 'top-center',
      style: options.style || {},
      className: options.className || "",
      icon: options.icon || '',
    });
  }

  static Toaster() {
    return <Toaster />;
  }
}

export default Notify;