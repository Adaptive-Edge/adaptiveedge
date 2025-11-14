import type { BlogPost } from './types';

export const blogPosts: BlogPost[] = [
  {
    slug: 'the-genre-trap',
    title: 'The Genre Trap: Why Organisations Can Only Think Thoughts They Have Stories For',
    date: '2025-11-11',
    author: 'Nathan Waterhouse',
    category: 'Organisational Culture',
    excerpt: 'Exploring how the narratives and mental models we carry limit our ability to imagine new possibilities, and what it takes to break free from these invisible constraints.',
    content: `Organisations can only think the thoughts they have stories for. Like genres in literature or film, we rely on familiar narratives to make sense of the world around us. But what happens when the challenges we face don't fit the stories we know?

This article explores how our mental models and organisational narratives create invisible boundaries around what we can imagine and achieve. We'll examine why breakthrough innovation often requires not just new ideas, but entirely new ways of storytelling.

[Read the full article on LinkedIn](https://www.linkedin.com/pulse/genre-trap-why-organisations-can-only-think-thoughts-waterhouse)`,
    linkedinUrl: 'https://www.linkedin.com/pulse/genre-trap-why-organisations-can-only-think-thoughts-waterhouse',
    featured: true,
    image: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800',
  },
  {
    slug: 'beyond-the-learning-curve',
    title: 'Beyond the Learning Curve: How Creative Thinking Powers Organisational Agility',
    date: '2025-10-28',
    author: 'Nathan Waterhouse',
    category: 'Strategy & Innovation',
    excerpt: 'Why continuous learning alone isn\'t enough. Discover how creative thinking capabilities enable organisations to adapt and thrive in uncertain environments.',
    content: `The learning curve has become a corporate cliché—but what if the real competitive advantage isn't just about learning faster, but thinking differently?

In this piece, we examine how creative thinking capabilities serve as the foundation for true organisational agility. It's not just about acquiring new knowledge; it's about developing the cognitive flexibility to apply that knowledge in novel ways when facing unprecedented challenges.

[Read the full article on LinkedIn](https://www.linkedin.com/pulse/beyond-learning-curve-how-creative-thinking-powers-waterhouse)`,
    linkedinUrl: 'https://www.linkedin.com/pulse/beyond-learning-curve-how-creative-thinking-powers-waterhouse',
    featured: true,
  },
  {
    slug: 'why-were-brilliant-at-how',
    title: 'Why We\'re Brilliant at \'How\' But Struggle with \'Why\': The Strategy Workshop Paradox',
    date: '2025-10-14',
    author: 'Nathan Waterhouse',
    category: 'Strategy & Innovation',
    excerpt: 'Strategy workshops often excel at execution planning but miss the deeper question of purpose. Why does this happen, and what can we do about it?',
    content: `Walk into any strategy workshop and you'll see brilliant minds tackling the "how" with precision and expertise. But ask "why are we doing this?" and watch the room fall silent.

This paradox reveals something fundamental about how organisations approach strategic thinking. We've become masters of implementation while losing touch with purpose. This article examines why this happens and explores practical approaches to bringing the "why" back into strategic conversations.

[Read the full article on LinkedIn](https://www.linkedin.com/pulse/why-were-brilliant-how-struggle-strategy-workshop-waterhouse)`,
    linkedinUrl: 'https://www.linkedin.com/pulse/why-were-brilliant-how-struggle-strategy-workshop-waterhouse',
    featured: false,
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800',
  },
  {
    slug: 'the-paradox-of-progress',
    title: 'The Paradox of Progress: Why We\'re Underwhelmed When the Future Finally Shows Up',
    date: '2025-08-26',
    author: 'Nathan Waterhouse',
    category: 'AI & Technology',
    excerpt: 'We\'ve been promised transformative AI for years. Now it\'s here—so why does it feel anticlimactic? Exploring the psychological and organisational dynamics of technological change.',
    content: `The future arrived. We barely noticed.

After decades of promises about AI transformation, we now have tools that would have seemed like magic just years ago. Yet many organisations and individuals feel strangely underwhelmed. This paradox reveals crucial insights about how we relate to technological change and why managing expectations is as important as managing the technology itself.

This article explores the gap between anticipation and reality, and what it means for how we lead organisations through periods of rapid technological evolution.

[Read the full article on LinkedIn](https://www.linkedin.com/pulse/paradox-progress-why-were-underwhelmed-when-future-waterhouse)`,
    linkedinUrl: 'https://www.linkedin.com/pulse/paradox-progress-why-were-underwhelmed-when-future-waterhouse',
    featured: true,
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800',
  },
  {
    slug: 'the-oracle-effect',
    title: 'The Oracle Effect: Finding Answers vs. Finding Understanding in the Age of AI',
    date: '2025-08-12',
    author: 'Nathan Waterhouse',
    category: 'AI & Technology',
    excerpt: 'AI tools can give us instant answers—but are we losing something vital in the process? A reflection on the difference between information and understanding.',
    content: `In ancient times, people consulted oracles for answers to their most pressing questions. Today, we have AI. But there's a crucial difference between receiving an answer and developing understanding.

This article examines what we gain—and what we risk losing—when we can instantly access answers to almost any question. As AI becomes more capable, the challenge isn't technological; it's human. How do we ensure we're building understanding, not just consuming information?

For leaders and organisations, this distinction has profound implications for learning, decision-making, and long-term capability building.

[Read the full article on LinkedIn](https://www.linkedin.com/pulse/oracle-effect-finding-answers-vs-understanding-age-ai-waterhouse)`,
    linkedinUrl: 'https://www.linkedin.com/pulse/oracle-effect-finding-answers-vs-understanding-age-ai-waterhouse',
    featured: false,
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800',
  },
];

export const featuredBlogPosts = blogPosts.filter(post => post.featured);
