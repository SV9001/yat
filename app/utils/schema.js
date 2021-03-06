import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';
import attraction from 'yat/utils/attraction-schema';
import costFactor from 'yat/utils/cost-factor';
import randomNumber from 'yat/utils/random-number';

export default function schema(data) {
  return {
    // debugging: true,
    columns: {
      avatar: {
        classNames: 'panel-column-avatar',
        panels: {
          avatar: {
            classNames: 'panel-avatar'
          }
        }
      },
      body: {
        panels: {
          skeletal: {
            title: 'Skeletal System'
          }, muscle: {
            title: 'Muscles'
          }, fat: {
            title: 'Fat'
          }, skin: {
            title: 'Skin & Hair'
          }
        }
      }, primary: {
        unlocked: true,
        panels: {
          endocrine: {
            title: 'Endocrine System',
            unlocked: true
          }, mood: {
            title: 'Mood'
          }, fertility: {
            title: 'Fertility',
            unlocked: true
          }
        }
      }, center: {
        unlocked: true,
        classNames: 'panel-column-market',
        panels: {
          perkPanels: {
            title: 'Perks',
            unlocked: true
          }
        }
      }, tertiary: {
        unlocked: true,
        panels: {
          sexuality: {
            title: 'Sexualiity'
          }, ri: {
            title: 'Reproductive Imperative'
          }, nutrients: {
            title: 'Nutrients',
            unlocked: true
          }, mind: {
            title: 'Mind'
          }
        }
      }, social: {
        classNames: 'panel-column-avatar',
        panels: {
          social: {
            classNames: 'panel-avatar'
          }
        }
      }
    },
    perkPanels: {
      unlocked: true,
      observer: {
        component: 'special-perks-observer',
        unlocked: true
      },
      items: {
        component: 'special-perks',
        unlocked: true
      }
    },
    perks: 'passthrough',
    messages: 'passthrough',
    avatar: {
      avatar: {
        component: 'avatar-canvas'
      }
    },
    endocrine: {
      estrogen: {
        name: 'estrogen (E)',
        shortName: 'E',
        unit: 'weight',
        amount: 0,
        factories: {
          name: 'estrogen factory',
          amount: 0,
          costs: [{
            data,
            amount: computed('data.endocrine.estrogen.factories.amount', function() {
              return costFactor(this.get('data.endocrine.estrogen.factories.amount') + 1, 'micro3');
            }),
            source: alias('data.nutrients.protein')
          }],
          destroyCosts: [{
            data,
            amount: -1,
            source: alias('data.nutrients.protein')
          }],
          max: {
            amount: 1000
          },
          min: {
            amount: 0
          }
        },
        multiplier: {
          amount: 1
        },
        costs: [{
          data,
          amount: 1,
          source: alias('data.nutrients.fat')
        }]
      },
      humanGrowthHormone: {
        name: 'human growth hormone (HGH)',
        shortName: 'HGH',
        unit: 'weight',
        amount: 0,
        factories: {
          name: 'HGH factory',
          amount: 0,
          costs: [{
            data,
            amount: computed('data.endocrine.humanGrowthHormone.factories.amount', function() {
              return costFactor(this.get('data.endocrine.humanGrowthHormone.factories.amount') + 1, 'micro3');
            }),
            source: alias('data.nutrients.protein')
          }],
          destroyCosts: [{
            data,
            amount: -1,
            source: alias('data.nutrients.protein')
          }],
          max: {
            amount: 1000
          },
          min: {
            amount: 0
          }
        },
        multiplier: {
          amount: 1
        },
        costs: [{
          data,
          amount: 1,
          source: alias('data.nutrients.fat')
        }]
      },
      progesterone: {
        name: 'progesterone (P)',
        shortName: 'P',
        unit: 'weight',
        amount: 0,
        factories: {
          name: 'progesterone factory',
          amount: 0,
          costs: [{
            data,
            amount: computed('data.endocrine.progesterone.factories.amount', function() {
              return costFactor(this.get('data.endocrine.progesterone.factories.amount') + 1, 'micro3');
            }),
            source: alias('data.nutrients.protein')
          }],
          destroyCosts: [{
            data,
            amount: -1,
            source: alias('data.nutrients.protein')
          }],
          max: {
            amount: 1000
          },
          min: {
            amount: 0
          }
        },
        multiplier: {
          amount: 1
        },
        costs: [{
          data,
          amount: 1,
          source: alias('data.nutrients.fat')
        }]
      },
      testosterone: {
        name: 'testosterone (T)',
        shortName: 'T',
        unit: 'weight',
        unlocked: true,
        amount: 0,
        factories: {
          name: 'Leydig cells',
          amount: 0,
          costs: [{
            data,
            amount: computed('data.endocrine.testosterone.factories.amount', function() {
              return costFactor(this.get('data.endocrine.testosterone.factories.amount') + 1, 'micro3');
            }),
            source: alias('data.nutrients.protein')
          }],
          destroyCosts: [{
            data,
            amount: -1,
            source: alias('data.nutrients.protein')
          }],
          max: {
            amount: 1000
          },
          min: {
            amount: 0
          }
        },
        multiplier: {
          amount: 1
        },
        costs: [{
          data,
          amount: 1,
          source: alias('data.nutrients.fat')
        }]
      }
    },
    fertility: {
      fertility: {
        data,
        doNotStore: true,
        name: 'fertility',
        unit: 'percent',
        amount: computed('data.fat.buttFullness.amount', 'data.fat.legFem.amount', 'data.fat.legFullness.amount', function() {
          return ((this.get('data.fat.buttFullness.amount') + this.get('data.fat.legFem.amount') + this.get('data.fat.legFullness.amount')) / 4) * 2.25;
        })
      },
      pregnancy: {
        name: 'pregnancy',
        amount: 0,
        unit: 'percent',
        component: 'special-pregnancy'
      },
      ovarianConversion: {
        name: 'ovarian conversion',
        unit: 'percent',
        amount: 0,
        costs: [{
          data,
          amount: 25,
          source: alias('data.fertility.sperm')
        }],
        max: {
          amount: 100
        }
      },
      sperm: {
        name: 'sperm',
        unit: 'weight',
        unlocked: true,
        amount: 0,
        factories: {
          name: 'spermatogonium',
          amount: 0,
          costs: [{
            data,
            amount: computed('data.fertility.sperm.factories.amount', function() {
              return costFactor(this.get('data.fertility.sperm.factories.amount') + 1, 'micro1');
            }),
            source: alias('data.nutrients.protein')
          }],
          destroyCosts: [{
            data,
            amount: -1,
            source: alias('data.nutrients.protein')
          }],
          max: {
            amount: 100
          },
          min: {
            amount: 0
          }
        },
        multiplier: {
          amount: 1
        },
        costs: [{
          data,
          amount: 1,
          source: alias('data.endocrine.testosterone')
        }],
        max: {
          name: 'epididymis',
          amount: 1000,
          costs: [{
            data,
            amount: computed('data.fertility.sperm.max.amount', function() {
              return costFactor(this.get('data.fertility.sperm.max.amount'), 'micro1');
            }),
            source: alias('data.nutrients.protein')
          }],
          max: {
            amount: 250
          }
        }
      }
    },
    mood: {
      arousal: {
        name: 'arousal',
        unit: 'percent',
        component: 'special-arousal',
        amount: 0,
        multiplier: {
          amount: 1
        },
        max: {
          amount: 100
        },
        costs: [{
          data,
          amount: 1,
          source: alias('data.endocrine.testosterone')
        }],
        factories: {
          name: 'fantasy',
          amount: 0,
          costs: [{
            data,
            amount: computed('data.mood.arousal.factories.amount', function() {
              return costFactor(this.get('data.mood.arousal.factories.amount') + 1, 'micro3');
            }),
            source: alias('data.mind.cognition')
          }],
          destroyCosts: [{
            data,
            amount: -1,
            source: alias('data.mind.cognition')
          }],
          max: {
            amount: 100
          },
          min: {
            amount: 0
          }
        }
      },
      hunger: {
        overall: {
          amount: 100
        },
        rate: {
          amount: 1,
          max: {
            amount: 100
          }
        },
        fat: {
          name: 'fat',
          unit: 'percent',
          amount: 40
        },
        minerals: {
          name: 'minerals',
          unit: 'percent',
          amount: 10
        },
        protein: {
          name: 'protein',
          unit: 'percent',
          amount: 50
        }
      }
    },
    nutrients: {
      eater: {
        component: 'special-nutrient-eater',
        unlocked: true
      },
      imperative: {
        name: 'imperative',
        amount: 1,
        max: {
          amount: 100
        },
        costs: [{
          data,
          amount: 1,
          source: alias('data.ri.ri')
        }]
      },
      salvage: {
        name: 'salvage efficiency',
        amount: 0,
        max: {
          amount: 100
        },
        multiplier: {
          amount: 1
        },
        costs: [{
          data,
          amount: 1,
          source: alias('data.ri.ri')
        }]
      },
      recoveries: {
        amount: 0
      },
      fat: {
        name: 'fat',
        unit: 'weight',
        amount: 0,
        unlocked: true,
        max: {
          data,
          doNotStore: true,
          amount: computed('data.nutrients.totalFat.amount', 'data.mood.hunger.fat.amount', function() {
            return this.get('data.nutrients.totalFat.amount') * this.get('data.mood.hunger.fat.amount');
          })
        }
      },
      minerals: {
        name: 'minerals',
        unit: 'weight',
        amount: 0,
        unlocked: true,
        max: {
          data,
          doNotStore: true,
          amount: computed('data.nutrients.totalFat.amount', 'data.mood.hunger.minerals.amount', function() {
            return this.get('data.nutrients.totalFat.amount') * this.get('data.mood.hunger.minerals.amount');
          })
        }
      },
      protein: {
        name: 'protein',
        unit: 'weight',
        amount: 0,
        unlocked: true,
        max: {
          data,
          doNotStore: true,
          amount: computed('data.nutrients.totalFat.amount', 'data.mood.hunger.protein.amount', function() {
            return this.get('data.nutrients.totalFat.amount') * this.get('data.mood.hunger.protein.amount');
          })
        }
      },
      totalFat: {
        data,
        doNotStore: true,
        amount: computed('data.fat.buttFullness.amount', 'data.fat.legFem.amount', 'data.fat.legFullness.amount', 'data.fat.waistWidth.amount', function() {
          return 100 * ((this.get('data.fat.buttFullness.amount') * 2) + (this.get('data.fat.legFem.amount')) + (this.get('data.fat.legFullness.amount') * 2) + (this.get('data.fat.waistWidth.amount') * 5));
        })
      }
    },
    ri: {
      ri: {
        name: 'ri',
        amount: 0
      },
      children: {
        name: 'children',
        amount: 0
      }
    },
    mind: {
      cognition: {
        name: 'cognition',
        amount: 0,
        factories: {
          name: 'neurons',
          amount: 0,
          costs: [{
            data,
            amount: 1,
            source: alias('data.ri.ri')
          }],
          max: {
            amount: 1000
          }
        },
        max: {
          name: 'memory',
          amount: 100,
          costs: [{
            data,
            amount: 1,
            source: alias('data.ri.ri')
          }],
          multiplier: {
            amount: 100
          }
        }
      }
    },
    sexuality: {
      attractionInterface: {
        component: 'special-attraction-interface'
      },
      attractionHint: {

      },
      orientation: {
        amount: 50,
        costs: [{
          data,
          amount: 1,
          source: alias('data.mind.cognition')
        }],
        destroyCosts: [{
          data,
          amount: 1,
          source: alias('data.mind.cognition')
        }],
        min: {
          amount: 0
        },
        max: {
          amount: 100
        }
      },
      orientationVariance: {
        amount: 10
      },
      genericSexTitle: {
        component: 'special-tag',
        tagName: 'h3',
        name: 'sexual encounters:'
      },
      maleSexTitle: {
        component: 'special-tag',
        tagName: 'h3',
        name: 'sexual encounters as a man:'
      },
      maleSexWithMen: {
        name: 'men',
        amount: 0,
      },
      rejectionsAsMan: {
        amount: 0
      },
      maleSexWithWomen: {
        name: 'women',
        amount: 0
      },
      femaleSexTitle: {
        component: 'special-tag',
        tagName: 'h3',
        name: 'sexual encounters as a woman:'
      },
      femaleSexWithMen: {
        name: 'men',
        amount: 0,
      },
      femaleSexWithWomen: {
        name: 'women',
        amount: 0
      },
      rejectionsAsWoman: {
        amount: 0
      },
      sexIdentity: {
        amount: 'male'
      },
      masculinity: {
        data,
        doNotStore: true,
        amount: computed(function() {
          const playerGender = this.get('data.sexuality.sexIdentity.amount') === 'male' ? 'masc' : 'femme';
          let totalMasculinity = 0;
          let totalWeight = 0;
          Object.keys(attraction).forEach((key) => {
            const category = ['fat', 'muscle', 'skeletal', 'skin'].find((category) => this.get(`data.${category}.${key}.amount`) !== undefined);
            let masculinity = this.get(`data.${category}.${key}.amount`) * attraction[key][playerGender].weight;
            totalWeight += attraction[key][playerGender].weight;

            if (attraction[key].isFemme) masculinity = 100 - masculinity;

            totalMasculinity += masculinity;
          });

          return totalMasculinity / totalWeight;
        }).volatile()
      }
    },
    social: {
      visualizer: {
        component: 'special-social-visualizer'
      },
      currentEncounter: {
        genderExtremeness: {
          data,
          doNotStore: true,
          amount: computed('data.social.currentEncounter.masculinity', function() {
            const isMale = this.get('data.social.currentEncounter.isMale');
            const masculinity = this.get('data.social.currentEncounter.masculinity');
            return isMale ? (masculinity - 50) * 2 : (50 - masculinity) * 2;
          })
        },
        attractionRange: {
          data,
          doNotStore: true,
          amount: computed('data.social.currentEncounter.genderExtremeness.amount', function() {
            const isMale = this.get('data.social.currentEncounter.isMale');
            const encounterGenderExtremeness = this.get('data.social.currentEncounter.genderExtremeness.amount');
            let encounterAttractionMax = isMale ? 0 : 100;
            if (randomNumber(0, 100) > 90) encounterAttractionMax = encounterAttractionMax === 100 ? 0 : 100; // gay
            let encounterAttractionMin = encounterAttractionMax === 0 ?
              Math.max(3, 50 - (randomNumber((encounterGenderExtremeness) - 15, (encounterGenderExtremeness) + 5) / 2)) :
              Math.min(95, 50 + (randomNumber(encounterGenderExtremeness - 15, encounterGenderExtremeness + 5) / 2));
            if (randomNumber(0, 100) > 95) encounterAttractionMin = encounterAttractionMin === 100 ? 0 : 100; // pan/asexual

            return encounterAttractionMin < encounterAttractionMax ? [encounterAttractionMin, encounterAttractionMax] : [encounterAttractionMax, encounterAttractionMin];
          })
        },
        playerAttraction: {
          data,
          doNotStore: true,
          amount: computed('data.sexuality.orientation.amount', 'data.social.currentEncounter.masculinity', function() {
            return Math.max(0, ((100 - Math.abs(this.get('data.sexuality.orientation.amount') - this.get('data.social.currentEncounter.masculinity'))) - 90) * 10) || 0;
          })
        }
      }
    },
    avatarMods: {
      arousal: {
        data,
        doNotStore: true,
        amount: alias('data.mood.arousal.amount')
      }
    },
    fat: {
      breastSize: {
        name: 'breasts',
        amount: -1,
        multiplier: {
          amount: 0.5
        },
        costs: [{
          data,
          amount: computed('data.fat.breastSize.amount', function() {
            return costFactor((this.get('data.fat.breastSize.amount') + 2) * 2, 'macro10');
          }),
          source: alias('data.nutrients.fat')
        }, {
          data,
          amount: computed('data.fat.breastSize.amount', function() {
            return costFactor((this.get('data.fat.breastSize.amount') + 2) * 2, 'micro10');
          }),
          source: alias('data.endocrine.estrogen')
        }, {
          data,
          amount: computed('data.fat.breastSize.amount', function() {
            return costFactor((this.get('data.fat.breastSize.amount') + 2) * 2, 'micro10');
          }),
          source: alias('data.endocrine.progesterone')
        }],
        destroyCosts: [{
          data,
          amount: computed('data.fat.breastSize.amount', function() {
            return -costFactor((this.get('data.fat.breastSize.amount') + 2) * 2, 'macro10') * ((this.get('data.nutrients.salvage.amount') || 1) / 100);
          }),
          source: alias('data.nutrients.fat')
        }, {
          data,
          amount: computed('data.fat.breastSize.amount', function() {
            return costFactor(101 - ((this.get('data.fat.breastSize.amount') + 2) * 2), 'micro10');
          }),
          source: alias('data.endocrine.testosterone')
        }],
        max: {
          amount: 15,
          max: {
            amount: 51
          }
        },
        min: {
          amount: -1,
          min: {
            amount: -1
          }
        }
      },
      buttFullness: {
        name: 'butt',
        amount: 0,
        multiplier: {
          amount: 0.4
        },
        costs: [{
          data,
          amount: computed('data.fat.buttFullness.amount', function() {
            return costFactor((this.get('data.fat.buttFullness.amount') + 1) * 2.5, 'macro15');
          }),
          source: alias('data.nutrients.fat')
        }, {
          data,
          amount: computed('data.fat.buttFullness.amount', function() {
            return costFactor((this.get('data.fat.buttFullness.amount') + 1) * 2.5, 'micro15');
          }),
          source: alias('data.endocrine.estrogen')
        }],
        destroyCosts: [{
          data,
          amount: computed('data.fat.buttFullness.amount', function() {
            return -costFactor((this.get('data.fat.buttFullness.amount') + 1) * 2.5, 'macro15') * ((this.get('data.nutrients.salvage.amount') || 1) / 100);
          }),
          source: alias('data.nutrients.fat')
        }, {
          data,
          amount: computed('data.fat.breastSize.amount', function() {
            return costFactor(101 - ((this.get('data.fat.buttFullness.amount') + 1) * 2.5), 'micro15');
          }),
          source: alias('data.endocrine.testosterone')
        }],
        max: {
          amount: 15,
          max: {
            amount: 41
          }
        },
        min: {
          amount: 0,
          min: {
            amount: 0
          }
        }
      },
      faceFem: {
        name: 'face',
        amount: 0,
        multiplier: {
          amount: 0.4
        },
        costs: [{
          data,
          amount: computed('data.fat.faceFem.amount', function() {
            return costFactor((this.get('data.fat.faceFem.amount') + 1) * 2.5, 'macro5');
          }),
          source: alias('data.nutrients.fat')
        }, {
          data,
          amount: computed('data.fat.faceFem.amount', function() {
            return costFactor((this.get('data.fat.faceFem.amount') + 1) * 2.5, 'micro5');
          }),
          source: alias('data.endocrine.estrogen')
        }],
        destroyCosts: [{
          data,
          amount: computed('data.fat.faceFem.amount', function() {
            return -costFactor((this.get('data.fat.faceFem.amount') + 1) * 2.5, 'macro5') * ((this.get('data.nutrients.salvage.amount') || 1) / 100);
          }),
          source: alias('data.nutrients.fat')
        }, {
          data,
          amount: computed('data.fat.faceFem.amount', function() {
            return costFactor(101 - ((this.get('data.fat.faceFem.amount') + 1) * 2.5), 'micro5');
          }),
          source: alias('data.endocrine.testosterone')
        }],
        max: {
          amount: 15,
          max: {
            amount: 41
          }
        },
        min: {
          amount: 0,
          min: {
            amount: 0
          }
        }
      },
      legFem: {
        name: 'hips',
        amount: 0,
        multiplier: {
          amount: 0.4
        },
        costs: [{
          data,
          amount: computed('data.fat.legFem.amount', function() {
            return costFactor((this.get('data.fat.legFem.amount') + 1) * 2.5, 'macro15');
          }),
          source: alias('data.nutrients.fat')
        }, {
          data,
          amount: computed('data.fat.legFem.amount', function() {
            return costFactor((this.get('data.fat.legFem.amount') + 1) * 2.5, 'micro15');
          }),
          source: alias('data.endocrine.estrogen')
        }],
        destroyCosts: [{
          data,
          amount: computed('data.fat.legFem.amount', function() {
            return -costFactor((this.get('data.fat.legFem.amount') + 1) * 2.5, 'macro15') * ((this.get('data.nutrients.salvage.amount') || 1) / 100);
          }),
          source: alias('data.nutrients.fat')
        }, {
          data,
          amount: computed('data.fat.legFem.amount', function() {
            return costFactor(101 - ((this.get('data.fat.legFem.amount') + 1) * 2.5), 'micro15');
          }),
          source: alias('data.endocrine.testosterone')
        }],
        max: {
          amount: 15,
          max: {
            amount: 41
          }
        },
        min: {
          amount: 0,
          min: {
            amount: 0
          }
        }
      },
      legFullness: {
        name: 'thighs',
        amount: 0,
        multiplier: {
          amount: 0.4
        },
        costs: [{
          data,
          amount: computed('data.fat.legFullness.amount', function() {
            return costFactor((this.get('data.fat.legFullness.amount') + 1) * 2.5, 'macro20');
          }),
          source: alias('data.nutrients.fat')
        }, {
          data,
          amount: computed('data.fat.legFullness.amount', function() {
            return costFactor((this.get('data.fat.legFullness.amount') + 1) * 2.5, 'micro20');
          }),
          source: alias('data.endocrine.estrogen')
        }],
        destroyCosts: [{
          data,
          amount: computed('data.fat.legFullness.amount', function() {
            return -costFactor((this.get('data.fat.legFullness.amount') + 1) * 2.5, 'macro20') * ((this.get('data.nutrients.salvage.amount') || 1) / 100);
          }),
          source: alias('data.nutrients.fat')
        }, {
          data,
          amount: computed('data.fat.legFullness.amount', function() {
            return costFactor(101 - ((this.get('data.fat.legFullness.amount') + 1) * 2.5), 'micro20');
          }),
          source: alias('data.endocrine.testosterone')
        }],
        max: {
          amount: 15,
          max: {
            amount:41
          }
        },
        min: {
          amount: 0,
          min: {
            amount: 0
          }
        }
      },
      waistWidth: {
        name: 'waist',
        amount: 105,
        multiplier: {
          amount: 0.8
        },
        costs: [{
          data,
          amount: computed('data.fat.waistWidth.amount', function() {
            return costFactor((this.get('data.fat.waistWidth.amount') - 69) * 1.25, 'macro20');
          }),
          source: alias('data.nutrients.fat')
        }, {
          data,
          amount: computed('data.fat.waistWidth.amount', function() {
            return costFactor((this.get('data.fat.waistWidth.amount') - 69) * 1.25, 'micro20');
          }),
          source: alias('data.endocrine.testosterone')
        }],
        destroyCosts: [{
          data,
          amount: computed('data.fat.legFullness.amount', function() {
            return -costFactor((this.get('data.fat.waistWidth.amount') - 69) * 1.25, 'macro20') * ((this.get('data.nutrients.salvage.amount') || 1) / 100);
          }),
          source: alias('data.nutrients.fat')
        }, {
          data,
          amount: computed('data.fat.legFullness.amount', function() {
            return costFactor(101 - ((this.get('data.fat.waistWidth.amount') - 69) * 1.25), 'micro20');
          }),
          source: alias('data.endocrine.estrogen')
        }],
        max: {
          amount: 150,
          max: {
            amount: 151
          }
        },
        min: {
          amount: 100,
          min: {
            amount: 70
          }
        }
      }
    },
    muscle: {
      lowerMuscle: {
        name: 'legs',
        amount: 0,
        multiplier: {
          amount: 0.4
        },
        costs: [{
          data,
          amount: computed('data.muscle.lowerMuscle.amount', function() {
            return costFactor((this.get('data.muscle.lowerMuscle.amount') + 1) * 2.5, 'macro20');
          }),
          source: alias('data.nutrients.protein')
        }, {
          data,
          amount: computed('data.muscle.lowerMuscle.amount', function() {
            return costFactor((this.get('data.muscle.lowerMuscle.amount') + 1) * 2.5, 'micro20');
          }),
          source: alias('data.endocrine.testosterone')
        }],
        destroyCosts: [{
          data,
          amount: computed('data.muscle.lowerMuscle.amount', function() {
            return -costFactor((this.get('data.muscle.lowerMuscle.amount') + 1) * 2.5, 'macro20') * ((this.get('data.nutrients.salvage.amount') || 1) / 100);
          }),
          source: alias('data.nutrients.protein')
        }, {
          data,
          amount: computed('data.muscle.lowerMuscle.amount', function() {
            return costFactor(101 - ((this.get('data.muscle.lowerMuscle.amount') + 1) * 2.5), 'micro20');
          }),
          source: alias('data.endocrine.estrogen')
        }],
        max: {
          amount: 20,
          max: {
            amount: 41
          }
        },
        min: {
          amount: 10,
          min: {
            amount: 0
          }
        }
      },
      neckWidth: {
        name: 'neck',
        amount: 45,
        multiplier: {
          amount: 0.4
        },
        costs: [{
          data,
          amount: computed('data.muscle.neckWidth.amount', function() {
            return costFactor((this.get('data.muscle.neckWidth.amount') - 34) * 2.5, 'macro10');
          }),
          source: alias('data.nutrients.protein')
        }, {
          data,
          amount: computed('data.muscle.neckWidth.amount', function() {
            return costFactor((this.get('data.muscle.neckWidth.amount') - 34) * 2.5, 'micro10');
          }),
          source: alias('data.endocrine.testosterone')
        }],
        destroyCosts: [{
          data,
          amount: computed('data.muscle.neckWidth.amount', function() {
            return -costFactor((this.get('data.muscle.neckWidth.amount') - 34) * 2.5, 'macro10') * ((this.get('data.nutrients.salvage.amount') || 1) / 100);
          }),
          source: alias('data.nutrients.protein')
        }, {
          data,
          amount: computed('data.muscle.neckWidth.amount', function() {
            return costFactor(101 - ((this.get('data.muscle.neckWidth.amount') - 34) * 2.5), 'micro10');
          }),
          source: alias('data.endocrine.estrogen')
        }],
        max: {
          amount: 60,
          max: {
            amount: 76
          }
        },
        min: {
          amount: 45,
          min: {
            amount: 35
          }
        }
      },
      penisSize: {
        name: 'penis',
        doNotStore: true,
        data,
        amount: computed('data.endocrine.testosterone.factories.amount', 'data.fertility.ovarianConversion.amount', function() {
          return Math.min(100 - this.get('data.fertility.ovarianConversion.amount'), 20 + ((this.get('data.endocrine.testosterone.factories.amount') / 500) * 100));
        }),
        // amount: 20,
        // multiplier: {
        //   amount: 1.85
        // },
        // costs: [{
        //   data,
        //   amount: computed('data.muscle.penisSize.amount', function() {
        //     return costFactor((this.get('data.muscle.penisSize.amount') - 13) * 0.54, 'macro5');
        //   }),
        //   source: alias('data.nutrients.protein')
        // }, {
        //   data,
        //   amount: computed('data.muscle.penisSize.amount', function() {
        //     return costFactor((this.get('data.muscle.penisSize.amount') - 13) * 0.54, 'micro5');
        //   }),
        //   source: alias('data.endocrine.testosterone')
        // }],
        // destroyCosts: [{
        //   data,
        //   amount: computed('data.muscle.penisSize.amount', function() {
        //     return -costFactor((this.get('data.muscle.penisSize.amount') - 13) * 0.54, 'macro5') * ((this.get('data.nutrients.salvage.amount') || 1) / 100);
        //   }),
        //   source: alias('data.nutrients.protein')
        // }, {
        //   data,
        //   amount: computed('data.muscle.penisSize.amount', function() {
        //     return costFactor(101 - ((this.get('data.muscle.penisSize.amount') - 13) * 0.54), 'micro5');
        //   }),
        //   source: alias('data.endocrine.estrogen')
        // }],
        // max: {
        //   amount: 100,
        //   max: {
        //     amount: 200
        //   }
        // },
        // min: {
        //   amount: 50,
        //   min: {
        //     amount: 14
        //   }
        // }
      },
      testicleSize: {
        name: 'testicles',
        doNotStore: true,
        data,
        amount: computed('data.fertility.sperm.factories.amount', 'data.fertility.ovarianConversion.amount', function() {
          return Math.min(100 - this.get('data.fertility.ovarianConversion.amount'), 35 + ((this.get('data.fertility.sperm.factories.amount') / 500) * 100));
        }),
        // max: {
        //   amount: 60,
        //   max: {
        //     amount: 100
        //   }
        // },
        // min: {
        //   amount: 35,
        //   min: {
        //     amount: 26
        //   }
        // }
        // amount: 45,
        // multiplier: {
        //   amount: 0.74
        // },
        // costs: [{
        //   data,
        //   amount: computed('data.muscle.testicleSize.amount', function() {
        //     return costFactor((this.get('data.muscle.testicleSize.amount') - 25) * 1.35, 'macro5');
        //   }),
        //   source: alias('data.nutrients.protein')
        // }, {
        //   data,
        //   amount: computed('data.muscle.testicleSize.amount', function() {
        //     return costFactor((this.get('data.muscle.testicleSize.amount') - 25) * 1.35, 'micro5');
        //   }),
        //   source: alias('data.endocrine.testosterone')
        // }],
        // destroyCosts: [{
        //   data,
        //   amount: computed('data.muscle.testicleSize.amount', function() {
        //     return -costFactor((this.get('data.muscle.testicleSize.amount') - 25) * 1.35, 'macro5') * ((this.get('data.nutrients.salvage.amount') || 1) / 100);
        //   }),
        //   source: alias('data.nutrients.protein')
        // }, {
        //   data,
        //   amount: computed('data.muscle.testicleSize.amount', function() {
        //     return costFactor(101 - ((this.get('data.muscle.testicleSize.amount') - 25) * 1.35), 'micro5');
        //   }),
        //   source: alias('data.endocrine.estrogen')
        // }],
      },
      upperMuscle: {
        name: 'upper body',
        amount: 5,
        multiplier: {
          amount: 0.4
        },
        costs: [{
          data,
          amount: computed('data.muscle.upperMuscle.amount', function() {
            return costFactor((this.get('data.muscle.upperMuscle.amount') + 1) * 2.5, 'macro20');
          }),
          source: alias('data.nutrients.protein')
        }, {
          data,
          amount: computed('data.muscle.upperMuscle.amount', function() {
            return costFactor((this.get('data.muscle.upperMuscle.amount') + 1) * 2.5, 'micro20');
          }),
          source: alias('data.endocrine.testosterone')
        }],
        destroyCosts: [{
          data,
          amount: computed('data.muscle.upperMuscle.amount', function() {
            return -costFactor((this.get('data.muscle.upperMuscle.amount') + 1) * 2.5, 'macro20') * ((this.get('data.nutrients.salvage.amount') || 1) / 100);
          }),
          source: alias('data.nutrients.protein')
        }, {
          data,
          amount: computed('data.muscle.upperMuscle.amount', function() {
            return costFactor(101 - ((this.get('data.muscle.upperMuscle.amount') + 1) * 2.5), 'micro20');
          }),
          source: alias('data.endocrine.estrogen')
        }],
        max: {
          amount: 28,
          max: {
            amount: 41
          }
        },
        min: {
          amount: 10,
          min: {
            amount: 0
          }
        }
      },
      vaginaSize: {
        name: 'vagina',
        amount: 25,
        multiplier: {
          amount: 1
        },
        costs: [{
          data,
          amount: computed('data.muscle.vaginaSize.amount', function() {
            return costFactor((this.get('data.muscle.vaginaSize.amount') + 1) * 1, 'macro5');
          }),
          source: alias('data.nutrients.protein')
        }, {
          data,
          amount: computed('data.muscle.vaginaSize.amount', function() {
            return costFactor((this.get('data.muscle.vaginaSize.amount') + 1) * 1, 'micro5');
          }),
          source: alias('data.endocrine.testosterone')
        }],
        destroyCosts: [{
          data,
          amount: computed('data.muscle.vaginaSize.amount', function() {
            return -costFactor((this.get('data.muscle.vaginaSize.amount') + 1) * 1, 'macro5') * ((this.get('data.nutrients.salvage.amount') || 1) / 100);
          }),
          source: alias('data.nutrients.protein')
        }, {
          data,
          amount: computed('data.muscle.vaginaSize.amount', function() {
            return costFactor(101 - ((this.get('data.muscle.vaginaSize.amount') + 1) * 1), 'micro5');
          }),
          source: alias('data.endocrine.estrogen')
        }],
        max: {
          amount: 50,
          max: {
            amount: 101
          }
        },
        min: {
          amount: 0,
          min: {
            amount: 0
          }
        }
      },
    },
    skeletal: {
      armLength: {
        name: 'arms',
        amount: 40,
        multiplier: {
          amount: 0.5
        },
        costs: [{
          data,
          amount: computed('data.skeletal.armLength.amount', function() {
            return costFactor((this.get('data.skeletal.armLength.amount') - 29) * 2, 'macro20');
          }),
          source: alias('data.nutrients.minerals')
        }, {
          data,
          amount: computed('data.skeletal.armLength.amount', function() {
            return costFactor((this.get('data.skeletal.armLength.amount') - 29) * 2, 'micro20');
          }),
          source: alias('data.endocrine.humanGrowthHormone')
        }],
        destroyCosts: [{
          data,
          amount: computed('data.skeletal.armLength.amount', function() {
            return -costFactor((this.get('data.skeletal.armLength.amount') - 29) * 2, 'macro20') * ((this.get('data.nutrients.salvage.amount') || 1) / 100);
          }),
          source: alias('data.nutrients.minerals')
        }, {
          data,
          amount: computed('data.skeletal.armLength.amount', function() {
            return costFactor(101 - ((this.get('data.skeletal.armLength.amount') - 29) * 2), 'micro20');
          }),
          source: alias('data.endocrine.progesterone')
        }],
        max: {
          amount: 45,
          max: {
            amount: 81
          }
        },
        min: {
          amount: 35,
          min: {
            amount: 30
          }
        }
      },
      armThickness: {
        name: 'shoulders',
        amount: 45,
        multiplier: {
          amount: 0.5
        },
        costs: [{
          data,
          amount: computed('data.skeletal.armThickness.amount', function() {
            return costFactor((this.get('data.skeletal.armThickness.amount') - 44) * 2, 'macro15');
          }),
          source: alias('data.nutrients.minerals')
        }, {
          data,
          amount: computed('data.skeletal.armThickness.amount', function() {
            return costFactor((this.get('data.skeletal.armThickness.amount') - 44) * 2, 'micro5');
          }),
          source: alias('data.endocrine.testosterone')
        }, {
          data,
          amount: computed('data.skeletal.armThickness.amount', function() {
            return costFactor((this.get('data.skeletal.armThickness.amount') - 44) * 2, 'micro10');
          }),
          source: alias('data.endocrine.humanGrowthHormone')
        }],
        destroyCosts: [{
          data,
          amount: computed('data.skeletal.armThickness.amount', function() {
            return -costFactor((this.get('data.skeletal.armThickness.amount') - 44) * 2, 'macro15') * ((this.get('data.nutrients.salvage.amount') || 1) / 100);
          }),
          source: alias('data.nutrients.minerals')
        }, {
          data,
          amount: computed('data.skeletal.armThickness.amount', function() {
            return costFactor(101 - ((this.get('data.skeletal.armThickness.amount') - 44) * 2), 'micro15');
          }),
          source: alias('data.endocrine.progesterone')
        }],
        max: {
          amount: 85,
          max: {
            amount: 96
          }
        },
        min: {
          amount: 55,
          min: {
            amount: 45
          }
        }
      },
      chinWidth: {
        name: 'chin',
        amount: 40,
        multiplier: {
          amount: 0.8
        },
        costs: [{
          data,
          amount: computed('data.skeletal.chinWidth.amount', function() {
            return costFactor((this.get('data.skeletal.chinWidth.amount') - 29) * 1.25, 'macro5');
          }),
          source: alias('data.nutrients.minerals')
        }, {
          data,
          amount: computed('data.skeletal.chinWidth.amount', function() {
            return costFactor((this.get('data.skeletal.chinWidth.amount') - 29) * 1.25, 'micro5');
          }),
          source: alias('data.endocrine.testosterone')
        }, {
          data,
          amount: computed('data.skeletal.chinWidth.amount', function() {
            return costFactor((this.get('data.skeletal.chinWidth.amount') - 29) * 1.25, 'micro5');
          }),
          source: alias('data.endocrine.humanGrowthHormone')
        }],
        destroyCosts: [{
          data,
          amount: computed('data.skeletal.chinWidth.amount', function() {
            return -costFactor((this.get('data.skeletal.chinWidth.amount') - 29) * 1.25, 'macro5') * ((this.get('data.nutrients.salvage.amount') || 1) / 100);
          }),
          source: alias('data.nutrients.minerals')
        }, {
          data,
          amount: computed('data.skeletal.chinWidth.amount', function() {
            return costFactor(101 - ((this.get('data.skeletal.chinWidth.amount') - 29) * 1.25), 'micro5');
          }),
          source: alias('data.endocrine.progesterone')
        }],
        max: {
          amount: 60,
          max: {
            amount: 111
          }
        },
        min: {
          amount: 40,
          min: {
            amount: 30
          }
        }
      },
      faceLength: {
        name: 'face length',
        amount: 225,
        multiplier: {
          amount: 0.9
        },
        costs: [{
          data,
          amount: computed('data.skeletal.faceLength.amount', function() {
            return costFactor((this.get('data.skeletal.faceLength.amount') - 179) * 1.11, 'macro5');
          }),
          source: alias('data.nutrients.minerals')
        }, {
          data,
          amount: computed('data.skeletal.faceLength.amount', function() {
            return costFactor((this.get('data.skeletal.faceLength.amount') - 179) * 1.11, 'micro5');
          }),
          source: alias('data.endocrine.humanGrowthHormone')
        }],
        destroyCosts: [{
          data,
          amount: computed('data.skeletal.faceLength.amount', function() {
            return -costFactor((this.get('data.skeletal.faceLength.amount') - 179) * 1.11, 'macro5') * ((this.get('data.nutrients.salvage.amount') || 1) / 100);
          }),
          source: alias('data.nutrients.minerals')
        }, {
          data,
          amount: computed('data.skeletal.faceLength.amount', function() {
            return costFactor(101 - ((this.get('data.skeletal.faceLength.amount') - 179) * 1.11), 'micro5');
          }),
          source: alias('data.endocrine.progesterone')
        }],
        max: {
          amount: 260,
          max: {
            amount: 271
          }
        },
        min: {
          amount: 220,
          min: {
            amount: 180
          }
        }
      },
      faceWidth: {
        name: 'face width',
        amount: 90,
        multiplier: {
          amount: 0.3
        },
        costs: [{
          data,
          amount: computed('data.skeletal.faceWidth.amount', function() {
            return costFactor((this.get('data.skeletal.faceWidth.amount') - 74) * 3.33, 'macro5');
          }),
          source: alias('data.nutrients.minerals')
        }, {
          data,
          amount: computed('data.skeletal.faceWidth.amount', function() {
            return costFactor((this.get('data.skeletal.faceWidth.amount') - 74) * 3.33, 'micro5');
          }),
          source: alias('data.endocrine.humanGrowthHormone')
        }],
        destroyCosts: [{
          data,
          amount: computed('data.skeletal.faceWidth.amount', function() {
            return -costFactor((this.get('data.skeletal.faceWidth.amount') - 74) * 3.33, 'macro5') * ((this.get('data.nutrients.salvage.amount') || 1) / 100);
          }),
          source: alias('data.nutrients.minerals')
        }, {
          data,
          amount: computed('data.skeletal.faceWidth.amount', function() {
            return costFactor(101 - ((this.get('data.skeletal.faceWidth.amount') - 74) * 3.33), 'micro5');
          }),
          source: alias('data.endocrine.progesterone')
        }],
        max: {
          amount: 100,
          max: {
            amount: 106
          }
        },
        min: {
          amount: 80,
          min: {
            amount: 75
          }
        }
      },
      height: {
        name: 'overall',
        amount: 165,
        multiplier: {
          amount: 0.8
        },
        costs: [{
          data,
          amount: computed('data.skeletal.height.amount', function() {
            return costFactor((this.get('data.skeletal.height.amount') - 109) * 1.25, 'macro25');
          }),
          source: alias('data.nutrients.minerals')
        }, {
          data,
          amount: computed('data.skeletal.height.amount', function() {
            return costFactor((this.get('data.skeletal.height.amount') - 109) * 1.25, 'micro10');
          }),
          source: alias('data.endocrine.testosterone')
        }, {
          data,
          amount: computed('data.skeletal.height.amount', function() {
            return costFactor((this.get('data.skeletal.height.amount') - 109) * 1.25, 'micro15');
          }),
          source: alias('data.endocrine.humanGrowthHormone')
        }],
        destroyCosts: [{
          data,
          amount: computed('data.skeletal.height.amount', function() {
            return -costFactor((this.get('data.skeletal.height.amount') - 109) * 1.25, 'macro25') * ((this.get('data.nutrients.salvage.amount') || 1) / 100);
          }),
          source: alias('data.nutrients.minerals')
        }, {
          data,
          amount: computed('data.skeletal.height.amount', function() {
            return costFactor(101 - ((this.get('data.skeletal.height.amount') - 109) * 1.25), 'micro25');
          }),
          source: alias('data.endocrine.progesterone')
        }],
        max: {
          amount: 180,
          max: {
            amount: 191
          }
        },
        min: {
          amount: 150,
          min: {
            amount: 110
          }
        }
      },
      handSize: {
        name: 'hands',
        amount: 100,
        multiplier: {
          amount: 1.6
        },
        costs: [{
          data,
          amount: computed('data.skeletal.handSize.amount', function() {
            return costFactor((this.get('data.skeletal.handSize.amount') - 39) * 0.625, 'macro5');
          }),
          source: alias('data.nutrients.minerals')
        }, {
          data,
          amount: computed('data.skeletal.handSize.amount', function() {
            return costFactor((this.get('data.skeletal.handSize.amount') - 39) * 0.625, 'micro5');
          }),
          source: alias('data.endocrine.testosterone')
        }, {
          data,
          amount: computed('data.skeletal.handSize.amount', function() {
            return costFactor((this.get('data.skeletal.handSize.amount') - 39) * 0.625, 'micro5');
          }),
          source: alias('data.endocrine.humanGrowthHormone')
        }],
        destroyCosts: [{
          data,
          amount: computed('data.skeletal.handSize.amount', function() {
            return -costFactor((this.get('data.skeletal.handSize.amount') - 39) * 0.625, 'macro5') * ((this.get('data.nutrients.salvage.amount') || 1) / 100);
          }),
          source: alias('data.nutrients.minerals')
        }, {
          data,
          amount: computed('data.skeletal.handSize.amount', function() {
            return costFactor(101 - ((this.get('data.skeletal.handSize.amount') - 39) * 0.625), 'micro5');
          }),
          source: alias('data.endocrine.progesterone')
        }],
        max: {
          amount: 170,
          max: {
            amount: 201
          }
        },
        min: {
          amount: 130,
          min: {
            amount: 40
          }
        }
      },
      hipWidth: {
        name: 'hips',
        amount: 120,
        multiplier: {
          amount: 1.1
        },
        costs: [{
          data,
          amount: computed('data.skeletal.hipWidth.amount', function() {
            return costFactor((this.get('data.skeletal.hipWidth.amount') - 89) * 0.91, 'macro15');
          }),
          source: alias('data.nutrients.minerals')
        }, {
          data,
          amount: computed('data.skeletal.hipWidth.amount', function() {
            return costFactor((this.get('data.skeletal.hipWidth.amount') - 89) * 0.91, 'micro5');
          }),
          source: alias('data.endocrine.estrogen')
        }, {
          data,
          amount: computed('data.skeletal.hipWidth.amount', function() {
            return costFactor((this.get('data.skeletal.hipWidth.amount') - 89) * 0.91, 'micro10');
          }),
          source: alias('data.endocrine.humanGrowthHormone')
        }],
        destroyCosts: [{
          data,
          amount: computed('data.skeletal.hipWidth.amount', function() {
            return -costFactor((this.get('data.skeletal.hipWidth.amount') - 89) * 0.91, 'macro15') * ((this.get('data.nutrients.salvage.amount') || 1) / 100);
          }),
          source: alias('data.nutrients.minerals')
        }, {
          data,
          amount: computed('data.skeletal.hipWidth.amount', function() {
            return costFactor(101 - ((this.get('data.skeletal.hipWidth.amount') - 89) * 0.91), 'micro15');
          }),
          source: alias('data.endocrine.progesterone')
        }],
        max: {
          amount: 140,
          max: {
            amount: 201
          }
        },
        min: {
          amount: 100,
          min: {
            amount: 90
          }
        }
      },
      legLength: {
        name: 'legs',
        amount: 95,
        multiplier: {
          amount: 0.25
        },
        costs: [{
          data,
          amount: computed('data.skeletal.legLength.amount', function() {
            return costFactor((this.get('data.skeletal.legLength.amount') - 89) * 4, 'macro20');
          }),
          source: alias('data.nutrients.minerals')
        }, {
          data,
          amount: computed('data.skeletal.legLength.amount', function() {
            return costFactor((this.get('data.skeletal.legLength.amount') - 89) * 4, 'micro20');
          }),
          source: alias('data.endocrine.humanGrowthHormone')
        }],
        destroyCosts: [{
          data,
          amount: computed('data.skeletal.legLength.amount', function() {
            return -costFactor((this.get('data.skeletal.legLength.amount') - 89) * 4, 'macro20') * ((this.get('data.nutrients.salvage.amount') || 1) / 100);
          }),
          source: alias('data.nutrients.minerals')
        }, {
          data,
          amount: computed('data.skeletal.legLength.amount', function() {
            return costFactor(101 - ((this.get('data.skeletal.legLength.amount') - 89) * 4), 'micro20');
          }),
          source: alias('data.endocrine.progesterone')
        }],
        max: {
          amount: 100,
          max: {
            amount: 116
          }
        },
        min: {
          amount: 90,
          min: {
            amount: 90
          }
        }
      },
      neckLength: {
        name: 'neck',
        amount: 85,
        multiplier: {
          amount: 1.21
        },
        costs: [{
          data,
          amount: computed('data.skeletal.neckLength.amount', function() {
            return costFactor((this.get('data.skeletal.neckLength.amount') + 1) * 0.83, 'macro5');
          }),
          source: alias('data.nutrients.minerals')
        }, {
          data,
          amount: computed('data.skeletal.neckLength.amount', function() {
            return costFactor((this.get('data.skeletal.neckLength.amount') + 1) * 0.83, 'micro5');
          }),
          source: alias('data.endocrine.humanGrowthHormone')
        }],
        destroyCosts: [{
          data,
          amount: computed('data.skeletal.neckLength.amount', function() {
            return -costFactor((this.get('data.skeletal.neckLength.amount') + 1) * 0.83, 'macro5') * ((this.get('data.nutrients.salvage.amount') || 1) / 100);
          }),
          source: alias('data.nutrients.minerals')
        }, {
          data,
          amount: computed('data.skeletal.neckLength.amount', function() {
            return costFactor(101 - ((this.get('data.skeletal.neckLength.amount') + 1) * 0.83), 'micro5');
          }),
          source: alias('data.endocrine.progesterone')
        }],
        max: {
          amount: 95,
          max: {
            amount: 121
          }
        },
        min: {
          amount: 70,
          min: {
            amount: 0
          }
        }
      },
      shoulderWidth: {
        name: 'chest',
        amount: 70,
        multiplier: {
          amount: 1.1
        },
        costs: [{
          data,
          amount: computed('data.skeletal.shoulderWidth.amount', function() {
            return costFactor((this.get('data.skeletal.shoulderWidth.amount') - 39) * 0.91, 'macro20');
          }),
          source: alias('data.nutrients.minerals')
        }, {
          data,
          amount: computed('data.skeletal.shoulderWidth.amount', function() {
            return costFactor((this.get('data.skeletal.shoulderWidth.amount') - 39) * 0.91, 'micro10');
          }),
          source: alias('data.endocrine.testosterone')
        }, {
          data,
          amount: computed('data.skeletal.shoulderWidth.amount', function() {
            return costFactor((this.get('data.skeletal.shoulderWidth.amount') - 39) * 0.91, 'micro10');
          }),
          source: alias('data.endocrine.humanGrowthHormone')
        }],
        destroyCosts: [{
          data,
          amount: computed('data.skeletal.shoulderWidth.amount', function() {
            return -costFactor((this.get('data.skeletal.shoulderWidth.amount') - 39) * 0.91, 'macro20') * ((this.get('data.nutrients.salvage.amount') || 1) / 100);
          }),
          source: alias('data.nutrients.minerals')
        }, {
          data,
          amount: computed('data.skeletal.shoulderWidth.amount', function() {
            return costFactor(101 - ((this.get('data.skeletal.shoulderWidth.amount') - 39) * 0.91), 'micro20');
          }),
          source: alias('data.endocrine.progesterone')
        }],
        max: {
          amount: 90,
          max: {
            amount: 151
          }
        },
        min: {
          amount: 65,
          min: {
            amount: 40
          }
        }
      },
    },
    skin: {
      areolaSize: {
        name: 'nipples',
        amount: 15,
        multiplier: {
          amount: 0.5
        },
        costs: [{
          data,
          amount: computed('data.skin.areolaSize.amount', function() {
            return costFactor((this.get('data.skin.areolaSize.amount') + 1) * 2, 'macro5');
          }),
          source: alias('data.nutrients.minerals')
        }, {
          data,
          amount: computed('data.skin.areolaSize.amount', function() {
            return costFactor((this.get('data.skin.areolaSize.amount') + 1) * 2, 'micro5');
          }),
          source: alias('data.endocrine.estrogen')
        }, {
          data,
          amount: computed('data.skin.areolaSize.amount', function() {
            return costFactor((this.get('data.skin.areolaSize.amount') + 1) * 2, 'micro5');
          }),
          source: alias('data.endocrine.progesterone')
        }],
        destroyCosts: [{
          data,
          amount: computed('data.skin.areolaSize.amount', function() {
            return -costFactor((this.get('data.skin.areolaSize.amount') + 1) * 2, 'macro5') * ((this.get('data.nutrients.salvage.amount') || 1) / 100);
          }),
          source: alias('data.nutrients.minerals')
        }, {
          data,
          amount: computed('data.skin.areolaSize.amount', function() {
            return costFactor(101 - ((this.get('data.skin.areolaSize.amount') + 1) * 2), 'micro5');
          }),
          source: alias('data.endocrine.testosterone')
        }],
        max: {
          amount: 25,
          max: {
            amount: 51
          }
        },
        min: {
          amount: 10,
          min: {
            amount: 0
          }
        }
      },
      eyelashLength: {
        name: 'eye lashes',
        amount: 2,
        multiplier: {
          amount: 0.15
        },
        costs: [{
          data,
          amount: computed('data.skin.eyelashLength.amount', function() {
            return costFactor((this.get('data.skin.eyelashLength.amount') + 1) * 6.67, 'macro5');
          }),
          source: alias('data.nutrients.minerals')
        }, {
          data,
          amount: computed('data.skin.eyelashLength.amount', function() {
            return costFactor((this.get('data.skin.eyelashLength.amount') + 1) * 6.67, 'micro5');
          }),
          source: alias('data.endocrine.estrogen')
        }],
        destroyCosts: [{
          data,
          amount: computed('data.skin.eyelashLength.amount', function() {
            return -costFactor((this.get('data.skin.eyelashLength.amount') + 1) * 6.67, 'macro5') * ((this.get('data.nutrients.salvage.amount') || 1) / 100);
          }),
          source: alias('data.nutrients.minerals')
        }, {
          data,
          amount: computed('data.skin.eyelashLength.amount', function() {
            return costFactor(101 - ((this.get('data.skin.eyelashLength.amount') + 1) * 6.67), 'micro5');
          }),
          source: alias('data.endocrine.testosterone')
        }],
        max: {
          amount: 5,
          max: {
            amount: 16
          }
        },
        min: {
          amount: 0,
          min: {
            amount: 0
          }
        }
      },
      eyeSize: {
        name: 'eye size',
        amount: 15,
        multiplier: {
          amount: 0.4
        },
        costs: [{
          data,
          amount: computed('data.skin.eyeSize.amount', function() {
            return costFactor((this.get('data.skin.eyeSize.amount') + 1) * 2.5, 'macro5');
          }),
          source: alias('data.nutrients.minerals')
        }, {
          data,
          amount: computed('data.skin.eyeSize.amount', function() {
            return costFactor((this.get('data.skin.eyeSize.amount') + 1) * 2.5, 'micro5');
          }),
          source: alias('data.endocrine.estrogen')
        }],
        destroyCosts: [{
          data,
          amount: computed('data.skin.eyeSize.amount', function() {
            return -costFactor((this.get('data.skin.eyeSize.amount') + 1) * 2.5, 'macro5') * ((this.get('data.nutrients.salvage.amount') || 1) / 100);
          }),
          source: alias('data.nutrients.minerals')
        }, {
          data,
          amount: computed('data.skin.eyeSize.amount', function() {
            return costFactor(101 - ((this.get('data.skin.eyeSize.amount') + 1) * 2.5), 'micro5');
          }),
          source: alias('data.endocrine.testosterone')
        }],
        max: {
          amount: 20,
          max: {
            amount: 41
          }
        },
        min: {
          amount: 10,
          min: {
            amount: 0
          }
        }
      },
      hairHue: {
        name: 'hair hue',
        amount: 0,
        multiplier: {
          amount: 1
        },
        costs: [{
          data,
          amount: 1,
          source: alias('data.nutrients.minerals')
        }],
        destroyCosts: [{
          data,
          amount: 1,
          source: alias('data.nutrients.minerals')
        }],
        max: {
          amount: 360,
          max: {
            amount: 360
          }
        },
        min: {
          amount: 0,
          min: {
            amount: 0
          }
        }
      },
      hairLength: {
        name: 'hair length',
        amount: 0,
        multiplier: {
          amount: 1.1
        },
        costs: [{
          data,
          amount: computed('data.skin.hairLength.amount', function() {
            return costFactor((this.get('data.skin.hairLength.amount') + 1) * 0.91, 'macro10');
          }),
          source: alias('data.nutrients.minerals')
        }, {
          data,
          amount: computed('data.skin.hairLength.amount', function() {
            return costFactor((this.get('data.skin.hairLength.amount') + 1) * 0.91, 'micro10');
          }),
          source: alias('data.endocrine.estrogen')
        }],
        destroyCosts: [{
          data,
          amount: computed('data.skin.hairLength.amount', function() {
            return costFactor(101 - ((this.get('data.skin.hairLength.amount') + 1) * 0.91), 'micro10');
          }),
          source: alias('data.endocrine.testosterone')
        }],
        max: {
          amount: 30,
          max: {
            amount: 111
          }
        },
        min: {
          amount: 0,
          min: {
            amount: 0
          }
        }
      },
      hairLightness: {
        name: 'hair lightness',
        amount: 0,
        multiplier: {
          amount: 1
        },
        costs: [{
          data,
          amount: 1,
          source: alias('data.nutrients.minerals')
        }],
        destroyCosts: [{
          data,
          amount: 1,
          source: alias('data.nutrients.minerals')
        }],
        max: {
          amount: 100,
          max: {
            amount: 100
          }
        },
        min: {
          amount: 0,
          min: {
            amount: 0
          }
        }
      },
      hairSaturation: {
        name: 'hair saturation',
        amount: 0,
        multiplier: {
          amount: 1
        },
        costs: [{
          data,
          amount: 1,
          source: alias('data.nutrients.minerals')
        }],
        destroyCosts: [{
          data,
          amount: 1,
          source: alias('data.nutrients.minerals')
        }],
        max: {
          amount: 100,
          max: {
            amount: 100
          }
        },
        min: {
          amount: 0,
          min: {
            amount: 0
          }
        }
      },
      hairStyle: {
        name: 'hair style',
        amount: 6,
        multiplier: {
          amount: 1
        },
        costs: [{
          data,
          amount: 1,
          source: alias('data.endocrine.progesterone')
        }],
        destroyCosts: [{
          data,
          amount: 1,
          source: alias('data.endocrine.progesterone')
        }],
        max: {
          amount: 7,
          max: {
            amount: 7
          }
        },
        min: {
          amount: 0,
          min: {
            amount: 0
          }
        }
      },
      lipSize: {
        name: 'lips',
        amount: 15,
        multiplier: {
          amount: 0.25
        },
        costs: [{
          data,
          amount: computed('data.skin.lipSize.amount', function() {
            return costFactor((this.get('data.skin.lipSize.amount') - 4) * 4, 'macro5');
          }),
          source: alias('data.nutrients.fat')
        }, {
          data,
          amount: computed('data.skin.lipSize.amount', function() {
            return costFactor((this.get('data.skin.lipSize.amount') - 4) * 4, 'micro5');
          }),
          source: alias('data.endocrine.estrogen')
        }],
        destroyCosts: [{
          data,
          amount: computed('data.skin.lipSize.amount', function() {
            return -costFactor((this.get('data.skin.lipSize.amount') - 4) * 4, 'macro5') * ((this.get('data.nutrients.salvage.amount') || 1) / 100);
          }),
          source: alias('data.nutrients.fat')
        }, {
          data,
          amount: computed('data.skin.lipSize.amount', function() {
            return costFactor(101 - ((this.get('data.skin.lipSize.amount') - 4) * 4), 'micro5');
          }),
          source: alias('data.endocrine.testosterone')
        }],
        max: {
          amount: 20,
          max: {
            amount: 31
          }
        },
        min: {
          amount: 10,
          min: {
            amount: 5
          }
        }
      },
      skin: {
        name: 'skin color',
        amount: 1,
        multiplier: {
          amount: 1
        },
        costs: [{
          data,
          amount: 1,
          source: alias('data.nutrients.minerals')
        }],
        destroyCosts: [{
          data,
          amount: 1,
          source: alias('data.nutrients.minerals')
        }],
        max: {
          amount: 27,
          max: {
            amount: 27
          }
        },
        min: {
          amount: -2,
          min: {
            amount: -2
          }
        }
      },

    }
  };
}
