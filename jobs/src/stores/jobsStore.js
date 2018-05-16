import axios from 'axios';
import _ from 'lodash';
import { observable, action } from 'mobx';
import qs from 'qs';
import reverseGeocode from 'latlng-to-zip';

class jobsStore {
  region = observable({
    longitude: -122,
    latitude: 37,
    longitudeDelta: 0.04,
    latitudeDelta: 0.09
  });

  results = observable([]);

  @observable likes = [];

  @action
  updateRegion(reg) {
    this.region = reg;
  }

  @action
  addLike(job) {
    console.log(job);
    this.likes.push(job);
  }

  @action
  clearLikes() {
    this.likes = [];
  }

  @action
  async fetchJobs(callback) {
    try {
      const zip = await reverseGeocode(this.region);
      const url = this.buildJobsUrl(zip);
      const { data } = await axios.get(url);
      this.results = data.results;
      callback();
    } catch (e) {
      console.log(e);
    }
  }

  @action
  buildJobsUrl(zip) {
    const query = {
      publisher: '4201738803816157',
      format: 'json',
      v: '2',
      latlong: 1,
      radius: 10,
      q: 'javascript'
    };
    const q = qs.stringify({ ...query, l: zip });
    return `http://api.indeed.com/ads/apisearch?${q}`;
  }
}

export default jobsStore;
