import { User, Post, Comment } from '../types';
import { format } from 'date-fns';

// Mock Users Data
export const users: User[] = [
  {
    id: '1',
    name: 'Jane Cooper',
    email: 'jane@example.com',
    bio: 'Senior Writer & Editor with over a decade of experience in digital publishing.',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    createdAt: '2023-01-15T10:00:00Z',
  },
  {
    id: '2',
    name: 'Devon Lane',
    email: 'devon@example.com',
    bio: 'Tech enthusiast and software engineer sharing insights on emerging technologies.',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
    createdAt: '2023-02-10T14:30:00Z',
  },
  {
    id: '3',
    name: 'Esther Howard',
    email: 'esther@example.com',
    bio: 'Travel writer exploring off-the-beaten-path destinations and cultural experiences.',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    createdAt: '2023-03-05T09:15:00Z',
  },
];

// Mock Posts Data
export const posts: Post[] = [
  {
    id: '1',
    title: 'The Future of Web Development: What to Expect in 2025',
    excerpt: 'Explore emerging technologies and trends that will shape the web development landscape in the coming years.',
    content: `# The Future of Web Development: What to Expect in 2025

Web development continues to evolve at a rapid pace, with new technologies and methodologies emerging regularly. As we look ahead to 2025, several key trends are poised to transform how developers build and users interact with web applications.

## AI-Driven Development

Artificial intelligence is revolutionizing the development process itself. Code completion tools powered by large language models can now generate entire functions based on natural language descriptions. By 2025, we'll likely see AI assistants that can build complete components or even simple applications from specifications.

## WebAssembly Everywhere

WebAssembly (Wasm) continues to gain momentum, enabling near-native performance in the browser. The technology is expanding beyond its initial use cases, with frameworks adopting Wasm for improved performance across various application types.

## Zero Bundle Size Applications

As browsers continue to implement more native API support, we're moving toward a future where many applications can be built with minimal or no bundled JavaScript. This approach, often called "The HTML-first movement," prioritizes built-in browser capabilities over JavaScript frameworks.

## Edge Computing

The edge computing paradigm is shifting more computation closer to users, reducing latency and improving performance. Frameworks like Next.js, Remix, and others now support edge rendering, and this trend will accelerate as more platforms offer streamlined edge deployment options.

The coming years will be an exciting time for web development, with these technologies making applications faster, more capable, and easier to build.`,
    coverImage: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    authorId: '2',
    createdAt: '2023-09-15T08:00:00Z',
    updatedAt: '2023-09-15T08:00:00Z',
    tags: ['Web Development', 'Technology', 'Future Trends'],
    likes: 124,
    commentsCount: 18,
  },
  {
    id: '2',
    title: 'Essential Tips for Sustainable Travel in 2025',
    excerpt: 'Discover how to minimize your environmental impact while exploring the world\'s most beautiful destinations.',
    content: `# Essential Tips for Sustainable Travel in 2025

As global tourism continues to grow, so does awareness of its environmental impact. Sustainable travel isn't just a trend—it's becoming a necessity for preserving the destinations we love to visit. Here are essential tips for environmentally conscious travelers in 2025.

## Choose Eco-Friendly Transportation

Transportation typically accounts for the largest portion of your travel carbon footprint. Consider these options:

- Take direct flights when possible, as takeoffs and landings create the most emissions
- Use high-speed trains for regional travel within continents
- Rent electric vehicles or use public transportation at your destination
- Consider carbon offset programs for unavoidable flights

## Support Local Communities

One of the most effective ways to travel sustainably is to ensure your tourism dollars benefit local communities:

- Stay in locally owned accommodations rather than international chains
- Eat at restaurants that source ingredients locally
- Purchase souvenirs directly from artisans
- Participate in community-based tourism initiatives

## Minimize Waste

The waste problem has reached critical levels in many popular destinations. Do your part by:

- Bringing a reusable water bottle, shopping bag, and utensils
- Avoiding single-use plastics whenever possible
- Properly disposing of waste and recycling when available
- Using digital tickets and guides instead of printed materials

## Respect Natural and Cultural Sites

Preservation of both natural environments and cultural heritage sites is critical:

- Stay on designated paths in natural areas
- Follow all rules at cultural sites and monuments
- Never remove natural objects or artifacts
- Keep a respectful distance from wildlife

By implementing these sustainable practices, you can enjoy memorable travel experiences while helping preserve destinations for future generations.`,
    coverImage: 'https://images.pexels.com/photos/2325446/pexels-photo-2325446.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    authorId: '3',
    createdAt: '2023-08-20T14:30:00Z',
    updatedAt: '2023-08-25T11:15:00Z',
    tags: ['Travel', 'Sustainability', 'Environment'],
    likes: 89,
    commentsCount: 12,
  },
  {
    id: '3',
    title: 'How to Build a Personal Brand in the Digital Age',
    excerpt: 'Learn effective strategies to establish your personal brand and stand out in a crowded digital landscape.',
    content: `# How to Build a Personal Brand in the Digital Age

In today's interconnected world, your personal brand is more important than ever. It's how you present yourself online, the values you stand for, and the unique perspective you bring to your industry. Here's how to build a compelling personal brand in the digital age.

## Define Your Unique Value Proposition

Before you start creating content or engaging online, clearly define:

- What makes you unique in your field
- The specific problems you help solve
- Who your target audience is
- The core values that guide your work

This foundation will inform all your branding decisions moving forward.

## Create Consistent, High-Quality Content

Content is the primary vehicle for expressing your personal brand:

- Choose 1-2 primary platforms where your audience spends time
- Develop a consistent posting schedule
- Focus on providing genuine value rather than self-promotion
- Establish a recognizable visual style and voice

## Engage Authentically with Your Community

Building a personal brand isn't just about broadcasting—it's about connection:

- Respond thoughtfully to comments and messages
- Participate in relevant communities and conversations
- Collaborate with complementary creators and brands
- Share others' valuable content, not just your own

## Monitor and Evolve Your Brand

Your personal brand should grow with you:

- Regularly audit how you're perceived online
- Solicit feedback from trusted connections
- Track which content resonates most with your audience
- Refine your approach based on changing goals and industry trends

Remember that building a meaningful personal brand takes time. Focus on consistently delivering value and authentic interactions rather than chasing vanity metrics or overnight success.`,
    coverImage: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    authorId: '1',
    createdAt: '2023-07-10T09:45:00Z',
    updatedAt: '2023-07-12T16:20:00Z',
    tags: ['Personal Branding', 'Digital Marketing', 'Career Development'],
    likes: 156,
    commentsCount: 23,
  },
  {
    id: '4',
    title: 'Understanding Modern JavaScript: From ES6 to ES2025',
    excerpt: 'A comprehensive guide to JavaScript evolution and how to leverage its modern features in your projects.',
    content: `# Understanding Modern JavaScript: From ES6 to ES2025

JavaScript has undergone a remarkable transformation since the introduction of ES6 (ECMAScript 2015). For developers looking to stay current, understanding the language's evolution is essential. Let's explore the most significant advancements from ES6 to the upcoming ES2025.

## The ES6 Revolution

ES6 marked the most substantial update to JavaScript, introducing:

- Arrow functions for more concise syntax
- Classes for clearer object-oriented programming
- Template literals for easier string interpolation
- Destructuring for simpler variable assignment
- Modules for better code organization
- Promises for improved asynchronous programming

## Key Developments Since ES6

Each subsequent release has further refined the language:

### ES2016-2018
- Async/await for more readable asynchronous code
- Object rest/spread properties for easier object manipulation
- Optional chaining to safely access nested properties

### ES2019-2021
- Array.prototype.flat and flatMap for working with nested arrays
- Optional chaining (?.) and nullish coalescing (??) operators
- Private class fields and methods
- Top-level await in modules

### ES2022-2024
- Array.prototype.at() for relative indexing
- Error cause property for better error handling
- Temporal API for improved date/time manipulation
- Array grouping methods

## Looking Forward: ES2025

The upcoming ES2025 specification is expected to include:

- Pattern matching for more expressive conditional logic
- Pipe operator for more readable function composition
- Additional decorators functionality
- New collection methods for arrays and objects

To stay current with JavaScript's evolution, regularly practice with new features in personal projects, follow the TC39 proposals, and use tools like Babel to experiment with future features today.`,
    coverImage: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    authorId: '2',
    createdAt: '2023-06-05T11:30:00Z',
    updatedAt: '2023-06-10T08:45:00Z',
    tags: ['JavaScript', 'Programming', 'Web Development'],
    likes: 210,
    commentsCount: 32,
  },
  {
    id: '5',
    title: 'Mindfulness Practices for Busy Professionals',
    excerpt: 'Discover practical mindfulness techniques that can be integrated into even the busiest work schedules.',
    content: `# Mindfulness Practices for Busy Professionals

In today's fast-paced professional environment, stress and burnout are increasingly common. Mindfulness—the practice of maintaining awareness of the present moment—offers powerful tools for managing stress and improving focus. Here are practical mindfulness techniques specifically designed for busy professionals.

## Micro-Meditation Moments

Even brief meditation sessions can yield significant benefits:

- One-minute breathing exercises between meetings
- 5-minute body scan meditations during lunch breaks
- 10-minute guided meditations before important presentations
- "Commute meditation" while on public transportation or waiting in traffic

These short practices help reset your mental state throughout the day.

## Mindful Task Transitions

The moments between tasks offer natural opportunities for mindfulness:

- Take three conscious breaths before checking email
- Pause for 30 seconds before entering a meeting room
- Briefly acknowledge the completion of one task before beginning another
- Set a gentle tone or chime to sound hourly as a mindfulness reminder

These transition practices prevent task-switching fatigue and maintain presence.

## Environmental Mindfulness Triggers

Your physical environment can support mindfulness practice:

- Place small objects on your desk that remind you to return to the present
- Set your phone wallpaper as a mindfulness cue
- Keep a small plant nearby to occasionally focus on
- Create a dedicated "mindfulness corner" in your workspace

These environmental cues serve as gentle reminders throughout your day.

## Digital Mindfulness Integration

Technology, often blamed for distraction, can actually support mindfulness:

- Use apps like Headspace, Calm, or Insight Timer for guided practices
- Set mindful screen time limits and regular digital breaks
- Enable "do not disturb" modes during focused work periods
- Practice "single-tasking" rather than constant multitasking

By integrating these mindfulness practices into your professional routine, you can cultivate greater calm, clarity, and effectiveness, even during the busiest work periods.`,
    coverImage: 'https://images.pexels.com/photos/3560044/pexels-photo-3560044.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    authorId: '3',
    createdAt: '2023-05-15T10:00:00Z',
    updatedAt: '2023-05-17T14:20:00Z',
    tags: ['Mindfulness', 'Productivity', 'Mental Health'],
    likes: 178,
    commentsCount: 26,
  },
];

// Mock Comments Data
export const comments: Comment[] = [
  {
    id: '1',
    content: 'Great article! I especially liked the section on AI-driven development.',
    authorId: '3',
    postId: '1',
    createdAt: '2023-09-16T09:30:00Z',
  },
  {
    id: '2',
    content: 'This was really insightful. I\'ve been trying to incorporate WebAssembly in my projects and this gave me some new ideas.',
    authorId: '1',
    postId: '1',
    createdAt: '2023-09-17T14:45:00Z',
  },
  {
    id: '3',
    content: 'I\'ve been implementing some of these sustainable travel tips and they really do make a difference without sacrificing the travel experience.',
    authorId: '2',
    postId: '2',
    createdAt: '2023-08-22T11:20:00Z',
  },
  {
    id: '4',
    content: 'The section on supporting local communities is so important. It\'s one of the most impactful ways to travel responsibly.',
    authorId: '1',
    postId: '2',
    createdAt: '2023-08-23T16:10:00Z',
  },
  {
    id: '5',
    content: 'I\'ve been struggling with building my personal brand. These concrete steps are exactly what I needed!',
    authorId: '2',
    postId: '3',
    createdAt: '2023-07-11T10:30:00Z',
  },
  {
    id: '6',
    content: 'The point about consistency is key. I\'ve seen my own following grow simply by showing up regularly with valuable content.',
    authorId: '3',
    postId: '3',
    createdAt: '2023-07-13T08:15:00Z',
  },
];

// Utility function to format date
export const formatDate = (dateString: string): string => {
  return format(new Date(dateString), 'MMM d, yyyy');
};

// Utility function to get author details
export const getAuthor = (authorId: string): User | undefined => {
  return users.find(user => user.id === authorId);
};

// Add author to posts
export const postsWithAuthor = posts.map(post => ({
  ...post,
  author: getAuthor(post.authorId),
}));

// Add author to comments
export const commentsWithAuthor = comments.map(comment => ({
  ...comment,
  author: getAuthor(comment.authorId),
}));

// Get featured posts (most liked)
export const featuredPosts = [...posts]
  .sort((a, b) => b.likes - a.likes)
  .slice(0, 3)
  .map(post => ({
    ...post,
    author: getAuthor(post.authorId),
  }));