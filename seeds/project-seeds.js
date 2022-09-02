// @ SONJA: THIS IS AN EXAMPLE OF A SEEDS TEMPLATE FROM OUR MODULE.
// WE'LL OBVIOUSLY NEED MORE DATA FOR OUR POST OBJECTS,
// BUT THIS IS A GOOD TEMPLATE FOR WRITING SEEDS :)

const { Project } = require('../models');

const projectdata = [
  {
    project_name: 'Donec posuere metus vitae ipsum.',
    abstract: 'i am the abstract!',
    subject: '',
    ongoing_status: true,
    project_url: 'https://buzzfeed.com/in/imperdiet/et/commodo/vulputate.png',
    collab_status: true,
    user_id: 10
  },
  {
    project_name: 'Morbi non quam nec dui luctus rutrum.',
    abstract: 'i am the abstract!',
    subject: '',
    ongoing_status: true,
    project_url: 'https://nasa.gov/donec.json',
    collab_status: false,
    user_id: 8
  },
  {
    project_name: 'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue.',
    abstract: 'i am the abstract!',
    subject: '',
    ongoing_status: true,
    project_url: 'https://europa.eu/parturient/montes/nascetur/ridiculus/mus/etiam/vel.aspx',
    collab_status: true,
    user_id: 1
  },
  {
    project_name: 'Nunc purus.',
    abstract: 'i am the abstract!',
    subject: '',
    ongoing_status: true,
    project_url: 'http://desdev.cn/enim/blandit/mi.jpg',
    collab_status: true,
    user_id: 4
  },
  {
    project_name: 'Pellentesque eget nunc.',
    abstract: 'i am the abstract!',
    subject: '',
    ongoing_status: true,
    project_url: 'http://google.ca/nam/nulla/integer.aspx',
    collab_status: true,
    user_id: 7
  },
  {
    project_name: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
    abstract: 'i am the abstract!',
    subject: '',
    ongoing_status: true,
    project_url: 'https://stanford.edu/consequat.png',
    collab_status: true,
    user_id: 4
  },
  {
    project_name: 'In hac habitasse platea dictumst.',
    abstract: 'i am the abstract!',
    subject: '',
    ongoing_status: true,
    project_url: 'http://edublogs.org/non/ligula/pellentesque.js',
    collab_status: false,
    user_id: 1
  },
  {
    project_name: 'Morbi non quam nec dui luctus rutrum.',
    abstract: 'i am the abstract!',
    subject: '',
    ongoing_status: true,
    project_url: 'http://ucla.edu/consequat/nulla.html',
    collab_status: false,
    user_id: 1
  },
  {
    project_name: 'Duis ac nibh.',
    abstract: 'i am the abstract!',
    subject: '',
    ongoing_status: true,
    project_url: 'http://theguardian.com/dui/vel/nisl/duis/ac/nibh.aspx',
    collab_status: true,
    user_id: 9
  },
  {
    project_name: 'Curabitur at ipsum ac tellus semper interdum.',
    abstract: 'i am the abstract!',
    subject: '',
    ongoing_status: true,
    project_url: 'https://reverbnation.com/ligula/sit.jpg',
    collab_status: true,
    user_id: 5
  },
  {
    project_name: 'In hac habitasse platea dictumst.',
    abstract: 'i am the abstract!',
    subject: '',
    ongoing_status: true,
    project_url: 'http://china.com.cn/lectus/vestibulum.json',
    collab_status: true,
    user_id: 3
  },
  {
    project_name: 'Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo.',
    abstract: 'i am the abstract!',
    subject: '',
    ongoing_status: true,
    project_url: 'http://networksolutions.com/nam/ultrices/libero/non/mattis/pulvinar.json',
    collab_status: false,
    user_id: 10
  },
  {
    project_name: 'Donec dapibus.',
    abstract: 'i am the abstract!',
    subject: '',
    ongoing_status: true,
    project_url: 'https://instagram.com/ac/neque/duis/bibendum/morbi/non.xml',
    collab_status: true,
    user_id: 8
  },
  {
    project_name: 'Nulla tellus.',
    abstract: 'i am the abstract!',
    subject: '',
    ongoing_status: true,
    project_url: 'https://lycos.com/natoque/penatibus/et.html',
    collab_status: false,
    user_id: 3
  },
  {
    project_name: 'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo.',
    abstract: 'i am the abstract!',
    subject: '',
    ongoing_status: true,
    project_url: 'https://gmpg.org/lorem.jpg',
    collab_status: true,
    user_id: 3
  },
  {
    project_name:
      'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam.',
    abstract: 'i am the abstract!',
    subject: '',
    ongoing_status: true,
    project_url: 'https://paginegialle.it/mattis/egestas.jsp',
    collab_status: true,
    user_id: 7
  },
  {
    project_name: 'In hac habitasse platea dictumst.',
    abstract: 'i am the abstract!',
    subject: '',
    ongoing_status: true,
    project_url: 'http://wikia.com/turpis/eget.jpg',
    collab_status: false,
    user_id: 6
  },
  {
    project_name: 'Etiam justo.',
    abstract: 'i am the abstract!',
    subject: '',
    ongoing_status: true,
    project_url: 'https://shareasale.com/quis.json',
    collab_status: false,
    user_id: 4
  },
  {
    project_name: 'Nulla ut erat id mauris vulputate elementum.',
    abstract: 'i am the abstract!',
    subject: '',
    ongoing_status: true,
    project_url: 'http://java.com/diam/neque/vestibulum/eget/vulputate/ut/ultrices.png',
    collab_status: true,
    user_id: 6
  },
  {
    project_name: 'Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.',
    abstract: 'i am the abstract!',
    subject: '',
    ongoing_status: true,
    project_url: 'https://java.com/at/nibh/in.png',
    collab_status: true,
    user_id: 7
  }
];

const seedPosts = () => Project.bulkCreate(projectdata);

module.exports = seedPosts;
