/**
 * Meeting Scheduler Component
 * Modal for scheduling meetings with improved integration
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, User, Mail, MessageSquare, Send, CheckCircle } from 'lucide-react';
import { useNotifications } from '../../hooks/useNotifications';
import { scheduleMeeting, getUserTimezone, getMinDate, getMaxDate, MeetingRequest } from '../../services/emailService';

interface MeetingSchedulerProps {
  isOpen: boolean;
  onClose: () => void;
}

const MeetingScheduler: React.FC<MeetingSchedulerProps> = ({ isOpen, onClose }) => {
  const { showSuccess, showError } = useNotifications();
  const [formData, setFormData] = useState<MeetingRequest>({
    name: '',
    email: '',
    date: '',
    time: '',
    timezone: getUserTimezone(),
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const success = await scheduleMeeting(formData);
      if (success) {
        setIsSuccess(true);
        showSuccess(
          'Meeting Scheduled!',
          'You\'ll receive calendar invites and confirmation emails shortly.'
        );
        
        // Reset form after 3 seconds and close modal
        setTimeout(() => {
          setIsSuccess(false);
          setFormData({
            name: '',
            email: '',
            date: '',
            time: '',
            timezone: getUserTimezone(),
            message: ''
          });
          onClose();
        }, 3000);
      }
    } catch (error) {
      console.error('Error scheduling meeting:', error);
      showError(
        'Failed to Schedule Meeting',
        'Please try again or contact us directly via email.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setIsSuccess(false);
      setFormData({
        name: '',
        email: '',
        date: '',
        time: '',
        timezone: getUserTimezone(),
        message: ''
      });
      onClose();
    }
  };

  // Generate time slots (9 AM to 6 PM)
  const timeSlots = [];
  for (let hour = 9; hour <= 18; hour++) {
    const time12 = hour > 12 ? `${hour - 12}:00 PM` : hour === 12 ? '12:00 PM' : `${hour}:00 AM`;
    const time24 = `${hour.toString().padStart(2, '0')}:00`;
    timeSlots.push({ value: time24, label: time12 });
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <motion.div
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.5, rotateY: -90 }}
            animate={{ scale: 1, rotateY: 0 }}
            exit={{ scale: 0.5, rotateY: 90 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative bg-gradient-to-r from-blue-600 to-emerald-600 text-white p-8 rounded-t-3xl">
              <button
                className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors disabled:opacity-50"
                onClick={handleClose}
                disabled={isSubmitting}
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="flex items-center mb-4">
                <Calendar className="w-8 h-8 mr-3" />
                <h2 className="text-3xl font-bold">
                  {isSuccess ? 'Meeting Scheduled!' : 'Schedule a Meeting'}
                </h2>
              </div>
              <p className="text-blue-100">
                {isSuccess 
                  ? 'Your consultation has been scheduled successfully!'
                  : 'Book a free 30-minute consultation to discuss your project'
                }
              </p>
            </div>

            {/* Content */}
            <div className="p-8">
              {isSuccess ? (
                <motion.div
                  className="text-center py-8"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">Meeting Scheduled!</h3>
                  <p className="text-slate-600 mb-4">
                    Your consultation has been scheduled successfully. You'll receive calendar invites and confirmation emails shortly.
                  </p>
                  <div className="bg-blue-50 rounded-lg p-4 text-sm text-blue-800 mb-6">
                    <p className="font-medium mb-2">Meeting Details:</p>
                    <ul className="space-y-1 text-blue-700">
                      <li>• Date: {new Date(formData.date).toLocaleDateString()}</li>
                      <li>• Time: {formData.time} ({formData.timezone})</li>
                      <li>• Duration: 30 minutes</li>
                      <li>• Type: Online consultation</li>
                    </ul>
                  </div>
                  <p className="text-sm text-slate-500">
                    This window will close automatically in a few seconds...
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                      <label htmlFor="name" className="block text-sm font-medium text-slate-900 mb-2">
                        <User className="w-4 h-4 inline mr-2" />
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border text-slate-900 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        placeholder="John Doe"
                        disabled={isSubmitting}
                      />
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                      <label htmlFor="email" className="block text-sm font-medium text-slate-900 mb-2">
                        <Mail className="w-4 h-4 inline mr-2" />
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border text-slate-900 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        placeholder="john@company.com"
                        disabled={isSubmitting}
                      />
                    </motion.div>
                  </div>

                  {/* Date and Time */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                      <label htmlFor="date" className="block text-sm font-medium text-slate-900 mb-2">
                        <Calendar className="w-4 h-4 inline mr-2" />
                        Preferred Date *
                      </label>
                      <input
                        type="date"
                        id="date"
                        name="date"
                        required
                        min={getMinDate()}
                        max={getMaxDate()}
                        value={formData.date}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border text-slate-900 border-slate-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        disabled={isSubmitting}
                      />
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                      <label htmlFor="time" className="block text-sm font-medium text-slate-700 mb-2">
                        <Clock className="w-4 h-4 inline mr-2" />
                        Preferred Time *
                      </label>
                      <select
                        id="time"
                        name="time"
                        required
                        value={formData.time}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 text-slate-900 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        disabled={isSubmitting}
                      >
                        <option value="">Select time</option>
                        {timeSlots.map((slot) => (
                          <option key={slot.value} value={slot.value}>
                            {slot.label}
                          </option>
                        ))}
                      </select>
                    </motion.div>
                  </div>

                  {/* Timezone */}
                  <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                    <label htmlFor="timezone" className="block text-sm font-medium text-slate-700 mb-2">
                      Timezone
                    </label>
                    <input
                      type="text"
                      id="timezone"
                      name="timezone"
                      value={formData.timezone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg bg-slate-50 text-slate-600"
                      readOnly
                    />
                  </motion.div>

                  {/* Message */}
                  <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                      <MessageSquare className="w-4 h-4 inline mr-2" />
                      Additional Message (Optional)
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 text-slate-900 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="Tell us about your project or any specific topics you'd like to discuss..."
                      disabled={isSubmitting}
                    />
                  </motion.div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-semibold py-4 px-8 rounded-lg relative overflow-hidden disabled:opacity-50"
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="flex items-center justify-center">
                      {isSubmitting ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        />
                      ) : (
                        <>
                          Schedule Meeting
                          <Send className="ml-2 w-5 h-5" />
                        </>
                      )}
                    </span>
                  </motion.button>

                  {/* Info */}
                  <div className="bg-blue-50 rounded-lg p-4 text-sm text-blue-800">
                    <p className="font-medium mb-2">What happens next?</p>
                    <ul className="space-y-1 text-blue-700">
                      <li>• You'll receive a calendar invite with meeting details</li>
                      <li>• We'll send you the meeting link 24 hours before</li>
                      <li>• Our team will prepare based on your project details</li>
                      <li>• The consultation is completely free with no obligations</li>
                    </ul>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MeetingScheduler;