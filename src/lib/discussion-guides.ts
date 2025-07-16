export interface DiscussionGuide {
  title: string
  objective: string
  duration: string
  sections: {
    title: string
    questions: string[]
  }[]
}

export const discussionGuides: Record<string, DiscussionGuide> = {
  mobileApps: {
    title: "Mobile App Usage Research",
    objective: "Understand user behavior and preferences for mobile applications",
    duration: "15-20 minutes",
    sections: [
      {
        title: "Warm-up & Background",
        questions: [
          "Can you tell me a bit about yourself and how you typically use your smartphone?",
          "What are your most frequently used apps on a daily basis?",
        ],
      },
      {
        title: "App Discovery & Selection",
        questions: [
          "How do you typically discover new apps?",
          "What factors influence your decision to download a new app?",
          "Can you walk me through the last time you downloaded a new app?",
        ],
      },
      {
        title: "User Experience & Preferences",
        questions: [
          "What makes an app enjoyable or frustrating to use?",
          "How important is app design vs functionality to you?",
          "Tell me about an app you deleted recently and why.",
        ],
      },
      {
        title: "Wrap-up",
        questions: [
          "Is there anything else about your app usage that you think would be helpful for us to know?",
          "Do you have any questions for me about this research?",
        ],
      },
    ],
  },

  ecommerce: {
    title: "E-commerce Shopping Behavior",
    objective: "Explore online shopping habits and decision-making processes",
    duration: "20-25 minutes",
    sections: [
      {
        title: "Shopping Background",
        questions: [
          "How often do you shop online versus in physical stores?",
          "What types of products do you most commonly buy online?",
        ],
      },
      {
        title: "Decision Making Process",
        questions: [
          "Walk me through your typical online shopping journey.",
          "What factors are most important when choosing where to shop online?",
          "How do you research products before making a purchase?",
        ],
      },
      {
        title: "Pain Points & Preferences",
        questions: [
          "What frustrates you most about online shopping?",
          "Tell me about a recent positive online shopping experience.",
          "How important are customer reviews in your decision making?",
        ],
      },
      {
        title: "Future Trends",
        questions: [
          "How has your online shopping behavior changed in recent years?",
          "What would make your online shopping experience even better?",
        ],
      },
    ],
  },

  foodDelivery: {
    title: "Food Delivery Service Research",
    objective: "Understand usage patterns and preferences for food delivery apps",
    duration: "15-20 minutes",
    sections: [
      {
        title: "Usage Patterns",
        questions: [
          "How often do you use food delivery services?",
          "What situations typically lead you to order food delivery?",
        ],
      },
      {
        title: "App Selection & Features",
        questions: [
          "Which food delivery apps do you use and why?",
          "What features are most important to you in a food delivery app?",
          "How do you typically choose what to order?",
        ],
      },
      {
        title: "Experience & Satisfaction",
        questions: [
          "Tell me about your best and worst food delivery experiences.",
          "What would make you stop using a food delivery service?",
          "How important is delivery time versus food quality?",
        ],
      },
    ],
  },
}
