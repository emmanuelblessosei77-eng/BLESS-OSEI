export const dateTime = {
  getTodayDate: () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  },

  getDateFromNow: (days) => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toISOString().split('T')[0];
  },

  formatDate: (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  },

  formatTime: (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  },

 
  getBusinessHours: () => {
    return {
      open: '09:00',
      lunch_start: '12:00',
      lunch_end: '13:00',
      close: '17:00',
    };
  },

  isBusinessHour: (timeString) => {
    const [hours] = timeString.split(':').map(Number);
    return hours >= 9 && hours < 17;
  },

  getTimeSlots: (interval = 30) => {
    const slots = [];
    let start = 8 * 60; // 8:00 AM
    const end = 17 * 60; // 5:00 PM
    const lunchStart = 12 * 60; // 12:00 PM
    const lunchEnd = 13 * 60; // 1:00 PM

    while (start < end) {
      if (start < lunchStart || start >= lunchEnd) {
        const hours = Math.floor(start / 60);
        const minutes = start % 60;
        slots.push(
          `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
        );
      }
      start += interval;
    }

    return slots;
  },
};

export const strings = {
  capitalize: (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  },

  truncate: (str, length = 100) => {
    if (str.length <= length) return str;
    return str.substring(0, length) + '...';
  },

  toSlug: (str) => {
    return str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  },


  stripHTML: (html) => {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  },
};

export const numbers = {

  formatCurrency: (amount, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  },


  formatNumber: (num) => {
    return num.toLocaleString('en-US');
  },


  round: (num, decimals = 2) => {
    return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
  },
};


export const api = {

  request: async (url, options = {}) => {
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  },

 
  get: (url) => {
    return api.request(url, { method: 'GET' });
  },

 
  post: (url, data) => {
    return api.request(url, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  /**
   * PUT request
   */
  put: (url, data) => {
    return api.request(url, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  /**
   * DELETE request
   */
  delete: (url) => {
    return api.request(url, { method: 'DELETE' });
  },
};

/**
 * Local Storage Utilities
 */
export const storage = {
  /**
   * Set item in localStorage
   */
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Storage set failed:', error);
    }
  },

  /**
   * Get item from localStorage
   */
  get: (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Storage get failed:', error);
      return null;
    }
  },

  /**
   * Remove item from localStorage
   */
  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Storage remove failed:', error);
    }
  },

  /**
   * Clear all localStorage
   */
  clear: () => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Storage clear failed:', error);
    }
  },
};

export default {
  dateTime,
  strings,
  numbers,
  api,
  storage,
};
