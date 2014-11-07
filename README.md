## CKAN-govdata-rostock Provider for [Koop](https://github.com/Esri/koop)
-----------

This provider makes it possible to access [govdata's ckan JSON API](https://www.govdata.de/metadatenschema) as well as [Rostock's ckan JSON API](http://www.opendata-hro.de/api/3/action/package_list?-d) as either GeoJSON or an Esri FeatureService. This is particular useful for making maps and doing analysis on the web.

## Installation
1. To install/use this provider you first need a working installation of [Koop](https://github.com/Esri/koop). 
2. Stop your koop application.
3. Then from within the koop directory you'll need to run the following: 
- `npm install https://github.com/schlomm/koop-ckan_govdata_rostock/tarball/master`
4. Start your koop application.
5. Register Portals for the ckan-govdata_rostock koop provider: 
- `curl --data "host=http://www.govdata.de&id=govdata" localhost:1337/koop-ckan_govdata_rostock`
- `curl --data "host=http://www.opendata-hro.de&id=rostock" localhost:1337/koop-ckan_govdata_rostock`


## Use govdata&rostcock CKAN API
Because govdata's&rostock's CKAN API do not exactly follow some  'standards' of other ckan portals, this koop-provider is only an adapted one for the specific properties of govdata's&rostocks structure. After the provider is installed, and the portals are registered, you are ready for takeoff.  
What you'll need for that request to work is a dataset ID and a the URL of the ckan instance. The ID is what you'll use to reference datasets that come from ckan in Koop.   
To make sure this works you can visit: http://localhost/ckan-govdata_rostock and you should see the govdata.de and opendata-hro.de host as a listed item.

## Access Govdata&Rostock-CKAN Data
To get a list of all datasets on govdata.de or offenedaten-hro.de, you can use the this URL:  
- `your_server:port/ckan_govdata_rostock/govdata`, where `govdata` is the portalID
- `your_server:port/ckan_govdata_rostock/rostock`, where `rostock` is the portalID  
To access a dataset hosted on these sites, you'll need a "dataset id" from the CKAN endpoint, which could be referenced in Koop like so:   
- `your_server:port/ckan_govdata_rostock/portalID/<id>`

###### Used ckan-schema and links which might be important.
- `https://www.govdata.de/ckan/api/action/package_list?-d` and `hhttp://www.opendata-hro.de/api/action/package_list?-d` 
	- List all available datasets in the needed result-array, which is used [here](https://github.com/schlomm/koop-ckan_govdata/blob/master/models/ckan_govdata.js#L32).
- `https://www.govdata.de/ckan/api/action/package_show?id=glascontainer-hro-hro` and `http://www.opendata-hro.de/api/action/package_show?id=glascontainer`
	- Shows a dataset with all its metadata, which is used [here](https://github.com/schlomm/koop-ckan_govdata/blob/master/models/ckan_govdata.js#L31) for parsing the metatdata for available "csv"-files.
- `https://www.govdata.de/ckan/api/3/action/package_search?q=keyword` and `http://www.opendata-hro.de/api/3/action/package_search?q=keyword`
	- Searches for a specific phrase within all datasets.
- For more information, check the the official [CKAN API](http://docs.ckan.org/en/ckan-1.8.2/apiv3.html?highlight=package_list#parameters)

###### Standard ckan schema:
- portalURL/api/3/action/package_list
- portalURL/api/3/action/package_show?id=datasetID
- portalURL/api/3/action/package_search?q=keyword

###### govdata.de ckan schema:
- portalURL/ckan/api/3/action/package_list?-d
- portalURL/ckan/api/3/action/package_show?id=datasetID
- portalURL/ckan/api/3/action/package_search?q=keyword

###### opendata-hro.de ckan schema:
- portalURL/api/3/action/package_list?-d
- portalURL/api/3/action/package_show?id=datasetID
- portalURL/api/3/action/package_search?q=keyword



## Examples 
Here are a few example datasets of data hosted in govdata's ckan as csv and in the right format, which can be processed via Koop: 

* Govdata
	* oberbuergermeisterwahl_2012-hro-hro
	* simple_search_wwwberlindetestboaltglascontainer
	* bremen236_c_4419_de
	* friedhoefe-hro-hro
	* poststellen-hro-hro
	* reisebusparkplaetze-hro-hro
	* reisebusterminals-hro-hro
* opendata-hro
	* oberbuergermeisterwahl_2012
	* friedhoefe
	* poststellen
	* reisebusparkplaetze
	* reisebusterminals


Please note that most of the datasets are not well formated and that those does not follow necessary standards. Especially the needed .csv-files do not work in the most cases (at least for gavdata), because of a wrong formats, which results in parsing errors for koop.   
Although the above mentioned examples are useable, you are not able to make a Preview from it, because the needed geometries porperties are placed in the wrong array. 

#### Differences between [koop-ckan_govdata](https://github.com/schlomm/koop-ckan_govdata) and [koop-ckan](https://github.com/chelm/koop-ckan) 

 - URL to CKAN Endpoint was changed (check koop-ckan_govdata/models/ckan_govdata_rostock.js)
 - Fixed error for csv parsing
 - Routing
 - Registering
  

## Credits
[koop-ckan_govdata_rostock](https://github.com/schlomm/koop-ckan_govdata_rostock) is a fork from [koop-ckan](https://github.com/chelm/koop-ckan) with some edits to allow querying govdata.de and offenedaten-hro.de. Thanks to @chelm for this nice piece of software! :)
