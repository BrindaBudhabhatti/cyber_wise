
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
  },
  {
    slug: "aarav-talking-tablet",
    titleKey: "story.aarav_talking_tablet.title",
    descriptionKey: "story.aarav_talking_tablet.description",
    takeawayKey: "story.aarav_talking_tablet.takeaway",
    content: [
      {
        textKey: "story.aarav_talking_tablet.p1",
        imageUrl: "https://placehold.co/600x400.png",
        imageHint: "boy with tablet"
      },
      {
        textKey: "story.aarav_talking_tablet.p2",
        imageUrl: "https://placehold.co/600x400.png",
        imageHint: "pop-up cartoon ad"
      },
      {
        textKey: "story.aarav_talking_tablet.p3",
        imageUrl: "https://placehold.co/600x400.png",
        imageHint: "scared boy showing screen"
      },
      {
        textKey: "story.aarav_talking_tablet.p4",
        imageUrl: "https://placehold.co/600x400.png",
        imageHint: "boy and mother blocking ad"
      }
    ]
  },
  {
    slug: "nisha-password",
    titleKey: "story.nisha_password.title",
    descriptionKey: "story.nisha_password.description",
    takeawayKey: "story.nisha_password.takeaway",
    content: [
      {
        textKey: "story.nisha_password.p1",
        imageUrl: "https://placehold.co/600x400.png",
        imageHint: "girl playing game"
      },
      {
        textKey: "story.nisha_password.p2",
        imageUrl: "https://placehold.co/600x400.png",
        imageHint: "girl telling password"
      },
      {
        textKey: "story.nisha_password.p3",
        imageUrl: "https://placehold.co/600x400.png",
        imageHint: "girl locked out of game"
      },
      {
        textKey: "story.nisha_password.p4",
        imageUrl: "https://placehold.co/600x400.png",
        imageHint: "girl with parents learning"
      }
    ]
  },
  {
    slug: "raju-magic-tablet",
    titleKey: "story.raju_magic_tablet.title",
    descriptionKey: "story.raju_magic_tablet.description",
    takeawayKey: "story.raju_magic_tablet.takeaway",
    content: [
      {
        textKey: "story.raju_magic_tablet.p1",
        imageUrl: "https://placehold.co/600x400.png",
        imageHint: "boy playing tablet too long"
      },
      {
        textKey: "story.raju_magic_tablet.p2",
        imageUrl: "https://placehold.co/600x400.png",
        imageHint: "toys looking sad"
      },
      {
        textKey: "story.raju_magic_tablet.p3",
        imageUrl: "https://placehold.co/600x400.png",
        imageHint: "boy dreaming about toys"
      },
      {
        textKey: "story.raju_magic_tablet.p4",
        imageUrl: "https://placehold.co/600x400.png",
        imageHint: "boy playing outside happily"
      }
    ]
  },
  {
    slug: "maya-picture",
    titleKey: "story.maya_picture.title",
    descriptionKey: "story.maya_picture.description",
    takeawayKey: "story.maya_picture.takeaway",
    content: [
      {
        textKey: "story.maya_picture.p1",
        imageUrl: "https://placehold.co/600x400.png",
        imageHint: "girl posting photo"
      },
      {
        textKey: "story.maya_picture.p2",
        imageUrl: "https://placehold.co/600x400.png",
        imageHint: "stranger commenting"
      },
      {
        textKey: "story.maya_picture.p3",
        imageUrl: "https://placehold.co/600x400.png",
        imageHint: "girl talking to elder"
      },
      {
        textKey: "story.maya_picture.p4",
        imageUrl: "https://placehold.co/600x400.png",
        imageHint: "girl editing photo privacy"
      }
    ]
  }

];
