# DigitalCraft - 4-Member Digital Agency Website

A modern, responsive website for a boutique digital agency specializing in branding, UI/UX design, full-stack development, and AI/ML solutions.

## Features

- **Modern Design**: Beautiful, responsive design with 3D elements and animations
- **Time-Based Theming**: Colors automatically adapt based on time of day
- **Interactive Contact Form**: Integrated with SendGrid for email delivery
- **Meeting Scheduler**: Book consultations with calendar integration
- **Portfolio Showcase**: Interactive project gallery with detailed case studies
- **Team Profiles**: Meet the 4-member team with their specializations
- **Service Catalog**: Comprehensive overview of all services offered

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **3D Graphics**: Three.js, React Three Fiber
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Backend**: Supabase Edge Functions
- **Email Service**: SendGrid
- **Build Tool**: Vite

## Setup Instructions

### 1. Clone and Install

```bash
git clone <repository-url>
cd digitalcraft-website
npm install
```

### 2. Environment Configuration

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

Update the following variables in `.env`:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# SendGrid Configuration (for Edge Function)
SENDGRID_API_KEY=your-sendgrid-api-key
```

### 3. SendGrid Setup

1. **Create SendGrid Account**: Sign up at [sendgrid.com](https://sendgrid.com)
2. **Get API Key**: 
   - Go to Settings > API Keys
   - Create a new API key with "Full Access" permissions
   - Copy the API key
3. **Verify Sender Email**:
   - Go to Settings > Sender Authentication
   - Verify your sender email (adityakumar2482@gmail.com)
4. **Update Environment Variables**:
   - Add your SendGrid API key to the Supabase project environment variables
   - Or update the Edge Function with your API key

### 4. Supabase Setup

1. **Create Supabase Project**: Go to [supabase.com](https://supabase.com)
2. **Deploy Edge Function**:
   ```bash
   # Install Supabase CLI
   npm install -g supabase
   
   # Login to Supabase
   supabase login
   
   # Link your project
   supabase link --project-ref your-project-ref
   
   # Deploy the edge function
   supabase functions deploy send-email
   ```
3. **Set Environment Variables**:
   ```bash
   supabase secrets set SENDGRID_API_KEY=your-sendgrid-api-key
   ```

### 5. Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Email Service Configuration

The website uses SendGrid for email delivery through Supabase Edge Functions:

### Contact Form Emails
- **Admin Notification**: Sent to `adityakumar2482@gmail.com` with form details
- **User Confirmation**: Sent to user with thank you message and next steps

### Meeting Scheduler Emails
- **Admin Notification**: Meeting details with calendar link
- **User Confirmation**: Meeting confirmation with preparation tips

### Email Templates
- Professional HTML templates with responsive design
- Branded styling matching the website theme
- Clear call-to-action buttons and links
- Automatic calendar integration

## Customization

### Team Members
Update team information in `src/constants/index.ts`:

```typescript
export const TEAM_MEMBERS = [
  {
    name: "Your Name",
    role: "Your Role",
    bio: "Your bio...",
    skills: ["Skill 1", "Skill 2"],
    color: "gradient-class",
    meshColor: "#hexcolor"
  }
  // ... more members
];
```

### Services
Modify services in `src/constants/index.ts`:

```typescript
export const SERVICE_CATEGORIES = [
  {
    category: "Service Category",
    icon: "IconName",
    gradient: "gradient-class",
    services: [
      {
        title: "Service Name",
        description: "Service description...",
        features: ["Feature 1", "Feature 2"]
      }
    ]
  }
];
```

### Contact Information
Update contact details in:
- `src/constants/index.ts` - CONTACT_INFO array
- `supabase/functions/send-email/index.ts` - FROM_EMAIL and ADMIN_EMAIL

## Deployment

### Frontend Deployment
The frontend can be deployed to any static hosting service:

- **Vercel**: Connect your GitHub repository
- **Netlify**: Drag and drop the `dist` folder
- **GitHub Pages**: Use GitHub Actions for automatic deployment

### Backend (Edge Functions)
Edge functions are automatically deployed to Supabase when you run:

```bash
supabase functions deploy send-email
```

## Troubleshooting

### Email Not Sending
1. Check SendGrid API key is correctly set
2. Verify sender email is authenticated in SendGrid
3. Check Supabase Edge Function logs
4. Ensure CORS headers are properly configured

### 3D Elements Not Loading
1. Check browser WebGL support
2. Verify Three.js dependencies are installed
3. Check console for WebGL errors

### Contact Form Errors
1. Verify Supabase URL and API key
2. Check network requests in browser dev tools
3. Review Edge Function logs in Supabase dashboard

## Support

For questions or issues:
- Email: adityakumar2482@gmail.com
- Check the browser console for error messages
- Review Supabase Edge Function logs
- Verify all environment variables are set correctly

## License

This project is proprietary software for DigitalCraft agency.