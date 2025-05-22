export interface Animation {
  name: string;
  duration: number;
  frames: string[];
  loop: boolean;
}

export interface CharacterAnimations {
  [character: string]: Animation[];
}

export const ANIMATIONS: CharacterAnimations = {
  charmz: [
    {
      name: 'walking',
      duration: 1000,
      frames: [
        'charmz_walking_1',
        'charmz_walking_2',
        'charmz_walking_3',
        'charmz_walking_4'
      ],
      loop: true
    },
    {
      name: 'flirting',
      duration: 1200,
      frames: [
        'charmz_flirt_1',
        'charmz_flirt_2',
        'charmz_flirt_3',
        'charmz_flirt_4'
      ],
      loop: true
    },
    {
      name: 'eye_roll',
      duration: 800,
      frames: [
        'charmz_eye_roll_1',
        'charmz_eye_roll_2',
        'charmz_eye_roll_3'
      ],
      loop: false
    },
    {
      name: 'hair_flip',
      duration: 1000,
      frames: [
        'charmz_hair_1',
        'charmz_hair_2',
        'charmz_hair_3',
        'charmz_hair_4'
      ],
      loop: false
    },
    {
      name: 'smoking',
      duration: 1500,
      frames: [
        'charmz_smoke_1',
        'charmz_smoke_2',
        'charmz_smoke_3',
        'charmz_smoke_4'
      ],
      loop: true
    },
    {
      name: 'phone_check',
      duration: 1200,
      frames: [
        'charmz_phone_1',
        'charmz_phone_2',
        'charmz_phone_3',
        'charmz_phone_4'
      ],
      loop: false
    },
    {
      name: 'pose',
      duration: 2000,
      frames: [
        'charmz_pose_1',
        'charmz_pose_2',
        'charmz_pose_3',
        'charmz_pose_4'
      ],
      loop: true
    },
    {
      name: 'adjusting_sunglasses',
      duration: 500,
      frames: [
        'charmz_sunglasses_1',
        'charmz_sunglasses_2',
        'charmz_sunglasses_3'
      ],
      loop: false
    },
    {
      name: 'sipping_coffee',
      duration: 800,
      frames: [
        'charmz_coffee_1',
        'charmz_coffee_2',
        'charmz_coffee_3'
      ],
      loop: false
    },
    {
      name: 'smirking',
      duration: 1200,
      frames: [
        'charmz_smirk_1',
        'charmz_smirk_2',
        'charmz_smirk_3'
      ],
      loop: true
    },
    {
      name: 'looking_over_city',
      duration: 1500,
      frames: [
        'charmz_city_1',
        'charmz_city_2',
        'charmz_city_3'
      ],
      loop: true
    },
    {
      name: 'sipping_champagne',
      duration: 1000,
      frames: [
        'charmz_champagne_1',
        'charmz_champagne_2',
        'charmz_champagne_3'
      ],
      loop: false
    }
  ],
  scrapz: [
    {
      name: 'smoking',
      duration: 1000,
      frames: [
        'scrapz_smoke_1',
        'scrapz_smoke_2',
        'scrapz_smoke_3'
      ],
      loop: true
    },
    {
      name: 'eyeing_charmz',
      duration: 1200,
      frames: [
        'scrapz_eyeing_1',
        'scrapz_eyeing_2',
        'scrapz_eyeing_3'
      ],
      loop: true
    },
    {
      name: 'cigarette_drop',
      duration: 800,
      frames: [
        'scrapz_drop_1',
        'scrapz_drop_2',
        'scrapz_drop_3'
      ],
      loop: false
    },
    {
      name: 'adjusting_clothes',
      duration: 1000,
      frames: [
        'scrapz_clothes_1',
        'scrapz_clothes_2',
        'scrapz_clothes_3'
      ],
      loop: false
    },
    {
      name: 'sulking',
      duration: 1500,
      frames: [
        'scrapz_sulk_1',
        'scrapz_sulk_2',
        'scrapz_sulk_3'
      ],
      loop: true
    },
    {
      name: 'blowing_smoke',
      duration: 800,
      frames: [
        'scrapz_blow_1',
        'scrapz_blow_2',
        'scrapz_blow_3'
      ],
      loop: false
    },
    {
      name: 'looking_interesting',
      duration: 1200,
      frames: [
        'scrapz_look_1',
        'scrapz_look_2',
        'scrapz_look_3'
      ],
      loop: true
    }
  ],
  dumbo: [
    {
      name: 'drooling',
      duration: 800,
      frames: [
        'dumbo_drool_1',
        'dumbo_drool_2',
        'dumbo_drool_3'
      ],
      loop: true
    },
    {
      name: 'cleaning_up',
      duration: 1000,
      frames: [
        'dumbo_clean_1',
        'dumbo_clean_2',
        'dumbo_clean_3'
      ],
      loop: false
    },
    {
      name: 'trying_to_impress',
      duration: 1200,
      frames: [
        'dumbo_impress_1',
        'dumbo_impress_2',
        'dumbo_impress_3'
      ],
      loop: true
    },
    {
      name: 'awkward_smile',
      duration: 800,
      frames: [
        'dumbo_smile_1',
        'dumbo_smile_2',
        'dumbo_smile_3'
      ],
      loop: true
    },
    {
      name: 'spilling_food',
      duration: 1000,
      frames: [
        'dumbo_spill_1',
        'dumbo_spill_2',
        'dumbo_spill_3'
      ],
      loop: false
    },
    {
      name: 'sitting_up',
      duration: 1000,
      frames: [
        'dumbo_sit_1',
        'dumbo_sit_2',
        'dumbo_sit_3'
      ],
      loop: false
    },
    {
      name: 'looking_awkward',
      duration: 1200,
      frames: [
        'dumbo_awkward_1',
        'dumbo_awkward_2',
        'dumbo_awkward_3'
      ],
      loop: true
    }
  ]
};

export const getAnimation = (character: string, animationName: string): Animation => {
  const characterAnimations = ANIMATIONS[character];
  if (!characterAnimations) {
    throw new Error(`No animations found for character: ${character}`);
  }
  const animation = characterAnimations.find(a => a.name === animationName);
  if (!animation) {
    throw new Error(`No animation found for ${animationName} on ${character}`);
  }
  return animation;
};
