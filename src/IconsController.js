'use strict';

const cheerio = require('cheerio');
const request = require('request');
const options = require('./options.json')

exports.IconsList = function(req, res, err){

   if( res.statusCode !== 200){
      res.json({
        "err" : true,
        "msg" : "Não foi possível carregar os Icons.",
      });

      console.log(res.statusCode)
      return;
    }

   var CUrl = 'https://github.com/devicons/devicon/tree/master/icons'
   var Icons = []

   request(CUrl, options, function(error, response, body) {

    var $ = cheerio.load(body);
    var $el = $('.Details-content--hidden-not-important .position-relative');

  //  var SvgOriginal = $(this).find('.video-conteudo a').prop('href').split('/')[4]
   // var SvgFill = $(this).find('.video-conteudo a').attr('title')
    $el.each(function(index, el){

        var Name = $(this).find('.col-md-2 span a').attr('title')

        var PlainSvg = `https://raw.githubusercontent.com/devicons/devicon/master/icons/${Name}/${Name}-plain.svg`
        var OriginalSvg = `https://raw.githubusercontent.com/devicons/devicon/master/icons/${Name}/${Name}-original.svg`

           Icons.push({
                'id': index,
                'svg-plain': PlainSvg,
                'svg-original': OriginalSvg,
                'name': Name
             })

      })

    res.send({
        'icons': Icons
    });

   })
}
