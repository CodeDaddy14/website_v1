export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  service: string;
  budget?: string;
  message: string;
}

export interface MeetingRequest {
  name: string;
  email: string;
  date: string;
  time: string;
  timezone: string;
  message?: string;
}

const SUPABASE_URL = 'https://vjohlakjyldqtivxwpxi.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZqb2hsYWtqeWxkcXRpdnh3cHhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE4OTgxNzIsImV4cCI6MjA2NzQ3NDE3Mn0.zy2arNJ4_gwt4oJWCan1pVBS0WrTaylWRLmxNprF-ok';

export const sendContactForm = async (formData: ContactFormData): Promise<boolean> => {
  try {
    const response = await fetch(`${SUPABASE_URL}/functions/v1/send-email`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'contact',
        data: formData
      })
    });

    if (!response.ok) {
      let errorMessage = 'Failed to send contact form';
      try {
        const errorData = await response.json();
        errorMessage = errorData.error || errorMessage;
      } catch {
        const errorText = await response.text();
        errorMessage = errorText || errorMessage;
      }
      throw new Error(errorMessage);
    }

    const result = await response.json();
    console.log('✅ Contact form sent:', result);

    showNotification('Message sent successfully! We\'ll get back to you within 24 hours.', 'success');
    return true;
  } catch (error) {
    console.error('Error:', error);

    const subject = `Contact Form Submission from ${formData.name}`;
    const body = `
Name: ${formData.name}
Email: ${formData.email}
Company: ${formData.company || 'Not provided'}
Service: ${formData.service}
Budget: ${formData.budget || 'Not specified'}

Message:
${formData.message}
    `.trim();

    const mailtoLink = `mailto:adityakumar2482@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink);
    showNotification('Opening email client as fallback. Please send the email manually.', 'warning');
    return true;
  }
};

export const scheduleMeeting = async (meetingData: MeetingRequest): Promise<boolean> => {
  try {
    const response = await fetch(`${SUPABASE_URL}/functions/v1/send-email`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'meeting',
        data: meetingData
      })
    });

    if (!response.ok) {
      let errorMessage = 'Failed to schedule meeting';
      try {
        const errorData = await response.json();
        errorMessage = errorData.error || errorMessage;
      } catch {
        const errorText = await response.text();
        errorMessage = errorText || errorMessage;
      }
      throw new Error(errorMessage);
    }

    const result = await response.json();
    console.log('✅ Meeting scheduled:', result);

    showNotification('Meeting scheduled successfully! You\'ll receive calendar invites shortly.', 'success');
    return true;
  } catch (error) {
    console.error('Error:', error);

    const meetingDateTime = new Date(`${meetingData.date}T${meetingData.time}`);
    const endDateTime = new Date(meetingDateTime.getTime() + 30 * 60 * 1000);

    const startDate = meetingDateTime.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    const endDate = endDateTime.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(`DigitalCraft Consultation - ${meetingData.name}`)}&dates=${startDate}/${endDate}&details=${encodeURIComponent(`Consultation meeting with ${meetingData.name}\nEmail: ${meetingData.email}\n${meetingData.message || ''}`)}&location=Online%20Meeting`;

    window.open(calendarUrl, '_blank');
    showNotification('Opening Google Calendar as fallback. Please save the event manually.', 'warning');
    return true;
  }
};

const showNotification = (message: string, type: 'success' | 'error' | 'warning' = 'success') => {
  const notification = document.createElement('div');
  notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm transition-all duration-300 transform translate-x-full`;
  
  const colors = {
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
    warning: 'bg-yellow-400 text-black'
  };

  notification.className += ` ${colors[type]}`;
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => notification.classList.remove('translate-x-full'), 100);
  setTimeout(() => {
    notification.classList.add('translate-x-full');
    setTimeout(() => notification.remove(), 300);
  }, 5000);
};

export const getUserTimezone = (): string => {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
};

export const formatDateForInput = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

export const getMinDate = (): string => {
  return formatDateForInput(new Date());
};

export const getMaxDate = (): string => {
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 3);
  return formatDateForInput(maxDate);
};
