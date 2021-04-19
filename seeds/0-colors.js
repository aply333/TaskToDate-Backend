
exports.seed = function(knex) {
 
  return knex('COLORS').truncate()
    .then(function () {
 
      return knex('COLORS').insert([
        {
          color_name: 'orange',
          colorhex: '#FFCA8C',
          pallete_name: 'pastel'
        },
        {
          color_name: 'red',
          colorhex: '#FFBABA',
          pallete_name: 'pastel'
        },
        {
          color_name: 'purple',
          colorhex: '#B2B0FF',
          pallete_name: 'pastel'
        },
        {
          color_name: 'green',
          colorhex: '#B9E8C3',
          pallete_name: 'pastel'
        },
        {
          color_name: 'pink',
          colorhex: '#FF73B6',
          pallete_name: 'pastel'
        },
        {
          color_name: 'yellow',
          colorhex: '#FFF7AB',
          pallete_name: 'pastel'
        },
      ]);
    });
};
