var request = require('request'),
  csv = require('csv'),
  BaseModel = require('koop-server/lib/BaseModel.js');

var ckan_govdata_rostock = function( koop ){

  var ckan_govdata_rostock = {};
  ckan_govdata_rostock.__proto__ = BaseModel( koop );

  // adds a service to the koop.Cache.db
  // needs a host, generates an id 
  ckan_govdata_rostock.register = function( id, host, callback ){
    var type = 'ckan_govdata_rostock:services';
    koop.Cache.db.serviceCount( type, function(error, count){
      id = id || count++;
      koop.Cache.db.serviceRegister( type, {'id': id, 'host': host},  function( err, success ){
        callback( err, id );
      });
    });
  };

  ckan_govdata_rostock.remove = function( id, callback ){
    koop.Cache.db.serviceRemove( 'ckan_govdata_rostock:services', parseInt(id) || id,  callback);
  }; 

  // get service by id, no id == return all
  ckan_govdata_rostock.find = function( id, callback ){
    koop.Cache.db.serviceGet( 'ckan_govdata_rostock:services', parseInt(id) || id, callback);
  };

  

  ckan_govdata_rostock.getAll = function( host, options, callback ){

   if (host == 'http://www.govdata.de') {
       ckan_govdata_rostock.ckan_list_path = '/ckan/api/3/action/package_list?-d';
       ckan_govdata_rostock.ckan_path = '/ckan/api/3/action/package_show';      
    };
   if (host == 'http://www.opendata-hro.de') {
      ckan_govdata_rostock.ckan_list_path = '/api/3/action/package_list?-d';
      ckan_govdata_rostock.ckan_path = '/api/3/action/package_show';
    };

  var self = this;

    var url = host + self.ckan_list_path,
    result, links = [];
    request.get(url, function(err, data, response ){
      if (err) {
        callback(err, null);
      } else {
        result = JSON.parse(response).result;
        callback( null, result );
      }
    });
  };

  // got the service and get the item
  ckan_govdata_rostock.getResource = function( host, id, options, callback ){
    var self = this,
      type = 'ckan_govdata_rostock',
      key = [host,id].join('::'); 

        koop.Cache.get( type, key, options, function(err, entry ){
      if ( err ){
        var url = host + self.ckan_path + '?id='+ id;
        request.get(url, function(err, data, response ){
          if (err) {
            callback(err, null);
          } else {
            try {
              var result = JSON.parse(response).result,
                item_url;
              if ( result ){
                for (var i = 0; i < result.resources.length; i++){
                  if (result.resources[i].format == 'CSV' || result.resources[i].format == 'csv' ){
                    item_url = result.resources[i].url;
                  }
                }
                if ( item_url ){
                  request.get(item_url, function(err, data, res){
                    csv.parse( res, function(err, csv_data){
                      koop.GeoJSON.fromCSV( csv_data, function(err, geojson){
                        koop.Cache.insert( type, key, geojson, 0, function( err, success){
                          if ( success ) callback( null, [geojson] );
                        }); 
                      });
                    });
                  });
                } else {
                  callback('no CSV resources found', null);
                }
              } else {
                callback('no CSV resources found', null);
              }
            } catch(e){
              callback('Resource not found', null);
            }
          }
        });
      } else {
        callback( null, entry );
      }
    });

  };

  // compares the sha on the cached data and the hosted data
  // this method name is special reserved name that will get called by the cache model
  /*ckan.checkCache = function(key, data, options, callback){
    var self = this;
    var parts = key.split('::');
    url = parts[0] + this.ckan_path + parts[1] + '.json';

    var lapsed = (new Date().getTime() - data.updated_at);
    if (typeof(data.updated_at) == "undefined" || (lapsed > (1000*60*60))){
      callback(null, false);
    } else { 
      request.get(url, function( err, data, response ){
        if (err) {
          callback( err, null );
        } else {
          var types = JSON.parse( data.headers['x-soda2-types'] );
          var fields = JSON.parse( data.headers['x-soda2-fields'] );
          var locationField;
          types.forEach(function(t,i){
            if (t == 'location'){
              locationField = fields[i];
            }
          });
          self.toGeojson( JSON.parse( data.body ), locationField, function( error, geojson ){
            geojson.updated_at = new Date(data.headers['last-modified']).getTime();
            geojson.name = parts[1];
            callback( error, [geojson] );
          });
        }
      });
    }

  };*/

   // drops the item from the cache
  ckan_govdata_rostock.dropItem = function( host, itemId, options, callback ){
    var dir = [ 'ckan_govdata_rostock', host, itemId].join(':');
    koop.Cache.remove('ckan_govdata_rostock:'+host+':', itemId, options, function(err, res){
      koop.files.removeDir( 'files/' + dir, function(err, res){
        koop.files.removeDir( 'tiles/'+ dir, function(err, res){
          koop.files.removeDir( 'thumbs/'+ dir, function(err, res){
            callback(err, true);
          });
        });
      });
    });
  };

  return ckan_govdata_rostock;

};
  

module.exports = ckan_govdata_rostock;
