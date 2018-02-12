import Component from '@ember/component';
import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';

export default Component.extend({
  classNames: ['perks'],

  perks: computed('data.perks.available.[]', function() {
    return this.get('data.perks.available').map((perk) => {
      return this.get(perk);
    });
  }),

  enableSpermFactories: computed({
    get(key) {
      return {
        key,
        title: 'spermatogonia',
        description: 'generate sperm automatically',
        costs: [{
          data: this.get('data'),
          amount: 20,
          source: alias('data.endocrine.testosterone')
        }],
        callback() {
          this.attrs.unlockResource(this.get('data.fertility.sperm.factories'), 'primary', 'fertility');
        }
      }
    }
  }),

  enableTestosteroneFactories: computed({
    get(key) {
      return {
        key,
        title: 'Leydig cells',
        description: 'generate testosterone automatically',
        costs: [{
          data: this.get('data'),
          amount: 250,
          source: alias('data.nutrients.protein')
        }],
        callback() {
          this.attrs.unlockResource(this.get('data.endocrine.testosterone.factories'), 'primary', 'endocrine');
        }
      }
    }
  }),

  enableArousal: computed({
    get(key) {
      return {
        key,
        title: 'arousal',
        description: 'encourage reproductive acts',
        costs: [{
          data: this.get('data'),
          amount: 50,
          source: alias('data.endocrine.testosterone')
        }],
        callback() {
          this.attrs.unlockResource(this.get('data.mood.arousal'), 'primary', 'mood');
        }
      }
    }
  }),

  enableRi: computed({
    get(key) {
      return {
        key,
        title: 'reproductive imperative',
        description: 'demand more resources',
        costs: [{
          data: this.get('data'),
          amount: 50,
          source: alias('data.mood.arousal')
        }],
        callback() {
          this.attrs.unlockResource(this.get('data.ri.ri'), 'tertiary', 'ri');
          this.attrs.unlockResource(this.get('data.ri.children'), 'tertiary', 'ri');
        }
      }
    }
  }),

  enableMind: computed({
    get(key) {
      return {
        key,
        title: 'mind',
        description: 'seize control of neural resources',
        costs: [{
          data: this.get('data'),
          amount: 5,
          source: alias('data.ri.ri')
        }],
        callback() {
          this.attrs.unlockResource(this.get('data.mind.cognition'), 'tertiary', 'mind');
          this.attrs.unlockResource(this.get('data.mind.cognition.factories'), 'tertiary', 'mind');
          this.attrs.unlockResource(this.get('data.mind.cognition.max'), 'tertiary', 'mind');
        }
      }
    }
  }),

  enableAvatar: computed({
    get(key) {
      return {
        key,
        title: 'somatosensation',
        description: 'visualize the Body',
        costs: [{
          data: this.get('data'),
          amount: 250,
          source: alias('data.mind.cognition')
        }],
        callback() {
          this.attrs.unlockResource(this.get('data.avatar.avatar'), 'avatar', 'avatar');
        }
      }
    }
  }),

  actions: {
    purchase(perk) {
      const key = perk.key;
      this.get('data.perks.available').removeObject(key);
      this.get('data.perks.resolved').pushObject(key);
      this.attrs.payResourceCost(perk, 1, perk.costs);
      perk.callback.apply(this);
    }
  }
});
