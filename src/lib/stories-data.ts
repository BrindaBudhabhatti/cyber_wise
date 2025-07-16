
export type StoryContent = {
  textKey: string;
  imageUrl: string;
  imageHint: string;
};

export type Story = {
  slug: string;
  titleKey: string;
  descriptionKey: string;
  content: StoryContent[];
  takeawayKey: string;
};

export const stories: Story[] = [
  {
    slug: "mystery-friend",
    titleKey: "story.mystery_friend.title",
    descriptionKey: "story.mystery_friend.description",
    takeawayKey: "story.mystery_friend.takeaway",
    content: [
      {
        textKey: "story.mystery_friend.p1",
        imageUrl: "https://placehold.co/600x400.png",
        imageHint: "child playing game"
      },
      {
        textKey: "story.mystery_friend.p2",
        imageUrl: "https://placehold.co/600x400.png",
        imageHint: "confused child looking at screen"
      },
      {
        textKey: "story.mystery_friend.p3",
        imageUrl: "https://placehold.co/600x400.png",
        imageHint: "children talking computer"
      },
      {
        textKey: "story.mystery_friend.p4",
        imageUrl: "https://placehold.co/600x400.png",
        imageHint: "child blocking user"
      }
    ]
  },
  {
    slug: "ninas-selfie-scare",
    titleKey: "story.ninas_selfie_scare.title",
    descriptionKey: "story.ninas_selfie_scare.description",
    takeawayKey: "story.ninas_selfie_scare.takeaway",
    content: [
        {
            textKey: "story.ninas_selfie_scare.p1",
            imageUrl: "https://placehold.co/600x400.png",
            imageHint: "girl taking selfie"
        },
        {
            textKey: "story.ninas_selfie_scare.p2",
            imageUrl: "https://placehold.co/600x400.png",
            imageHint: "sad girl looking phone"
        },
        {
            textKey: "story.ninas_selfie_scare.p3",
            imageUrl: "https://placehold.co/600x400.png",
            imageHint: "girl talking teacher"
        },
        {
            textKey: "story.ninas_selfie_scare.p4",
            imageUrl: "https://placehold.co/600x400.png",
            imageHint: "girl smiling with friends"
        }
    ]
  }
];
