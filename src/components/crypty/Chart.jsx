import React from 'react'
import { Box } from '@chakra-ui/react';
import { useColorModeValue } from '@chakra-ui/react';
import { useEffect } from 'react';
import useTokenDetailsStore from './Stores/tokenDetailsStore';


// const jsonData = [
//     {
//         prices: [
//           [
//               1703277694553,
//               4.145461956551036
//           ],
//           [
//           1703277950703,
//           4.135136445878304
//           ],
//           [
//           1703278253947,
//           4.134699273286619
//           ],
//           [
//           1703278509419,
//           4.138499274515867
//           ],
//           [
//           1703278925445,
//           4.094467349581902
//           ],
//           [
//           1703279153362,
//           4.096941650876886
//           ],
//           [
//           1703279424530,
//           4.121428481159718
//           ],
//           [
//           1703279746612,
//           4.151501920330032
//           ],
//           [
//           1703280085917,
//           4.1465358766214875
//           ],
//           [
//           1703280323114,
//           4.164378003776489
//           ],
//           [
//           1703280692661,
//           4.277382028809607
//           ],
//           [
//           1703280886903,
//           4.272810135753923
//           ],
//           [
//           1703281250653,
//           4.270161005649386
//           ],
//           [
//           1703281550395,
//           4.144432864753892
//           ],
//           [
//           1703281771825,
//           4.155694771604053
//           ],
//           [
//           1703282146957,
//           4.162029122205361
//           ],
//           [
//           1703282428222,
//           4.25560482076478
//           ],
//           [
//           1703282733393,
//           4.27185370857455
//           ],
//           [
//           1703283007545,
//           4.2514301099522305
//           ],
//           [
//           1703283324548,
//           4.1059015349660735
//           ],
//           [
//           1703283652032,
//           4.088898081191973
//           ],
//           [
//           1703283937194,
//           4.0961016903240015
//           ],
//           [
//           1703284253797,
//           4.09032684382353
//           ],
//           [
//           1703284483221,
//           4.102623715756799
//           ],
//           [
//           1703284789716,
//           4.105542487392306
//           ],
//           [
//           1703285142909,
//           4.105207117515371
//           ],
//           [
//           1703285457013,
//           4.1007521705364445
//           ],
//           [
//           1703285741147,
//           4.0819133451393075
//           ],
//           [
//           1703286087840,
//           4.10029623654935
//           ],
//           [
//           1703286312476,
//           4.096263249798116
//           ],
//           [
//           1703286674407,
//           4.10645177103346
//           ],
//           [
//           1703286941918,
//           4.104328673626328
//           ],
//           [
//           1703287228364,
//           4.070414598319989
//           ],
//           [
//           1703287538834,
//           4.075270331891648
//           ],
//           [
//           1703287886620,
//           4.073794941228841
//           ],
//           [
//           1703288153785,
//           4.109884534248112
//           ],
//           [
//           1703288471831,
//           4.0997206621769005
//           ],
//           [
//           1703288729357,
//           4.109758008099082
//           ],
//           [
//           1703289087042,
//           4.118396436579781
//           ],
//           [
//           1703289277223,
//           4.153463436054333
//           ],
//           [
//           1703289681408,
//           4.148949004560868
//           ],
//           [
//           1703289937153,
//           4.150672112702008
//           ],
//           [
//           1703290287252,
//           4.024037989679646
//           ],
//           [
//           1703290484842,
//           4.026111211435803
//           ],
//           [
//           1703290850132,
//           4.03443833637481
//           ],
//           [
//           1703291089111,
//           4.032835409096775
//           ],
//           [
//           1703291490924,
//           4.029048890823134
//           ],
//           [
//           1703291722505,
//           4.010395192659324
//           ],
//           [
//           1703292050806,
//           3.9140638209499836
//           ],
//           [
//           1703292311507,
//           3.905308163303671
//           ],
//           [
//           1703292664049,
//           3.905080491938833
//           ],
//           [
//           1703292895126,
//           4.034023290675096
//           ],
//           [
//           1703293252966,
//           4.035865822737019
//           ],
//           [
//           1703293550842,
//           4.0337647347572645
//           ],
//           [
//           1703293844396,
//           3.996331388735913
//           ],
//           [
//           1703294084220,
//           3.9835052057783704
//           ],
//           [
//           1703294450038,
//           3.976241191801421
//           ],
//           [
//           1703294730460,
//           3.9717055945410578
//           ],
//           [
//           1703295081703,
//           3.9036316771504174
//           ],
//           [
//           1703295344856,
//           3.89778438610822
//           ],
//           [
//           1703295609853,
//           3.8982089642848554
//           ],
//           [
//           1703295944018,
//           3.864642779008024
//           ],
//           [
//           1703296273000,
//           3.863294301306635
//           ],
//           [
//           1703296530881,
//           3.859178153663206
//           ],
//           [
//           1703296881981,
//           3.80281500707395
//           ],
//           [
//           1703297122991,
//           3.7955171978592848
//           ],
//           [
//           1703297463928,
//           3.784316987732923
//           ],
//           [
//           1703297745056,
//           3.773355089522481
//           ],
//           [
//           1703298080878,
//           3.7059008541728753
//           ],
//           [
//           1703298350093,
//           3.6932472497260918
//           ],
//           [
//           1703298642344,
//           3.6818220576453418
//           ],
//           [
//           1703298940111,
//           3.6645735863395186
//           ],
//           [
//           1703299249618,
//           3.656771421268174
//           ],
//           [
//           1703299549348,
//           3.6104200238848105
//           ],
//           [
//           1703299819824,
//           3.6192731011184125
//           ],
//           [
//           1703300135002,
//           3.6300520108723413
//           ],
//           [
//           1703300494616,
//           3.7173328351983512
//           ],
//           [
//           1703300753555,
//           3.758283384864745
//           ],
//           [
//           1703301052008,
//           3.789805388807699
//           ],
//           [
//           1703301334224,
//           3.943647048269525
//           ],
//           [
//           1703301652330,
//           3.8893192000161934
//           ],
//           [
//           1703301941908,
//           3.8784463788846537
//           ],
//           [
//           1703302280625,
//           3.762504930349539
//           ],
//           [
//           1703302508006,
//           3.7544600854932257
//           ],
//           [
//           1703302832382,
//           3.7541901990839133
//           ],
//           [
//           1703303149091,
//           3.7471122841259605
//           ],
//           [
//           1703303446032,
//           3.87842095506741
//           ],
//           [
//           1703303736073,
//           3.890029672611005
//           ],
//           [
//           1703304089399,
//           3.884698627875009
//           ],
//           [
//           1703304350699,
//           3.8984496964296977
//           ],
//           [
//           1703304647462,
//           3.886806544190699
//           ],
//           [
//           1703304941506,
//           3.9029211920891336
//           ],
//           [
//           1703305282906,
//           3.861399988502783
//           ],
//           [
//           1703305542882,
//           3.86496957092196
//           ],
//           [
//           1703305847413,
//           3.8652600502607815
//           ],
//           [
//           1703306141706,
//           3.9225234595021448
//           ],
//           [
//           1703306479292,
//           3.921528062114519
//           ],
//           [
//           1703306748932,
//           3.90713808608876
//           ],
//           [
//           1703307056790,
//           3.834807411008815
//           ],
//           [
//           1703307342284,
//           3.82886209508962
//           ],
//           [
//           1703307640482,
//           3.831779077855415
//           ],
//           [
//           1703307953350,
//           3.766211284518328
//           ],
//           [
//           1703308235917,
//           3.777362781575687
//           ],
//           [
//           1703308552195,
//           3.7795149917114172
//           ],
//           [
//           1703308834571,
//           3.7579307332032803
//           ],
//           [
//           1703309152122,
//           3.726054859383207
//           ],
//           [
//           1703309482914,
//           3.7261970011410517
//           ],
//           [
//           1703309752111,
//           3.715410571817418
//           ],
//           [
//           1703310034777,
//           3.6702853339503023
//           ],
//           [
//           1703310346589,
//           3.664542626963598
//           ],
//           [
//           1703310645885,
//           3.656606774567898
//           ],
//           [
//           1703310938508,
//           3.6235730134977797
//           ],
//           [
//           1703311300610,
//           3.625530200166584
//           ],
//           [
//           1703311544051,
//           3.6353295021925227
//           ],
//           [
//           1703311837745,
//           3.6918664929923493
//           ],
//           [
//           1703312152293,
//           3.69132742663513
//           ],
//           [
//           1703312422304,
//           3.6906891653355873
//           ],
//           [
//           1703312736957,
//           3.6961819624614503
//           ],
//           [
//           1703313093534,
//           3.691960727380151
//           ],
//           [
//           1703313273305,
//           3.6905376228490763
//           ],
//           [
//           1703313688603,
//           3.6916987063624394
//           ],
//           [
//           1703313937848,
//           3.6934962111013347
//           ],
//           [
//           1703314235756,
//           3.696560563970262
//           ],
//           [
//           1703314539040,
//           3.6942701501279713
//           ],
//           [
//           1703314856144,
//           3.6865189229386988
//           ],
//           [
//           1703315135589,
//           3.6875615536398474
//           ],
//           [
//           1703315467867,
//           3.6784191754786817
//           ],
//           [
//           1703315743979,
//           3.6181342845950084
//           ],
//           [
//           1703316024784,
//           3.618343531507446
//           ],
//           [
//           1703316285081,
//           3.6253774539041
//           ],
//           [
//           1703316644296,
//           3.661576980478547
//           ],
//           [
//           1703316944354,
//           3.660708413215077
//           ],
//           [
//           1703317252297,
//           3.6572866475551633
//           ],
//           [
//           1703317545170,
//           3.6748095220769414
//           ],
//           [
//           1703317847754,
//           3.675819636232763
//           ],
//           [
//           1703318137609,
//           3.670742932636067
//           ],
//           [
//           1703318465654,
//           3.6566637545743466
//           ],
//           [
//           1703318690993,
//           3.6571881518713334
//           ],
//           [
//           1703319057256,
//           3.6632467732687024
//           ],
//           [
//           1703319342011,
//           3.6811147855293838
//           ],
//           [
//           1703319684908,
//           3.667017991533649
//           ],
//           [
//           1703319946842,
//           3.655533455363335
//           ],
//           [
//           1703320246136,
//           3.559258262488375
//           ],
//           [
//           1703320548831,
//           3.5374079513988743
//           ],
//           [
//           1703320850690,
//           3.537460062586669
//           ],
//           [
//           1703321140443,
//           3.4871146275253317
//           ],
//           [
//           1703321434018,
//           3.492881939287194
//           ],
//           [
//           1703321752460,
//           3.4758673810596936
//           ],
//           [
//           1703322096522,
//           3.3830385105048517
//           ],
//           [
//           1703322294532,
//           3.387134257314445
//           ],
//           [
//           1703322647171,
//           3.4269720900776623
//           ],
//           [
//           1703322926676,
//           3.428399780116384
//           ],
//           [
//           1703323253883,
//           3.4743323043592302
//           ],
//           [
//           1703323553793,
//           3.4492532047229076
//           ],
//           [
//           1703323889015,
//           3.419985405850379
//           ],
//           [
//           1703324150444,
//           3.360761239599778
//           ],
//           [
//           1703324413864,
//           3.361371165048995
//           ],
//           [
//           1703324748738,
//           3.3708892871965963
//           ],
//           [
//           1703325020454,
//           3.420771908511843
//           ],
//           [
//           1703325287793,
//           3.414269779493945
//           ],
//           [
//           1703325677321,
//           3.41929300765117
//           ],
//           [
//           1703325943900,
//           3.4387714130584284
//           ],
//           [
//           1703326254547,
//           3.445330649728244
//           ],
//           [
//           1703326546521,
//           3.4590223783602188
//           ],
//           [
//           1703326838232,
//           3.5145578537372155
//           ],
//           [
//           1703327125169,
//           3.536392868348383
//           ],
//           [
//           1703327448291,
//           3.536346430592486
//           ],
//           [
//           1703327724366,
//           3.5885453567310157
//           ],
//           [
//           1703328037735,
//           3.596340571381213
//           ],
//           [
//           1703328353320,
//           3.5939354338767555
//           ],
//           [
//           1703328657276,
//           3.5854693379777136
//           ],
//           [
//           1703328895914,
//           3.54575456184613
//           ],
//           [
//           1703329230065,
//           3.5418815202785647
//           ],
//           [
//           1703329509095,
//           3.540021863600628
//           ],
//           [
//           1703329820961,
//           3.519379097472795
//           ],
//           [
//           1703330155764,
//           3.5024691308477833
//           ],
//           [
//           1703330469643,
//           3.495373828621589
//           ],
//           [
//           1703330751151,
//           3.4505963481760786
//           ],
//           [
//           1703331049492,
//           3.448534062083453
//           ],
//           [
//           1703331292509,
//           3.447989325452904
//           ],
//           [
//           1703331693593,
//           3.460997989479161
//           ],
//           [
//           1703331934596,
//           3.4693895354321422
//           ],
//           [
//           1703332270905,
//           3.470545327403891
//           ],
//           [
//           1703332543786,
//           3.4902136975471056
//           ],
//           [
//           1703332894132,
//           3.488977160000911
//           ],
//           [
//           1703333143983,
//           3.4905993820710934
//           ],
//           [
//           1703333431966,
//           3.4898146168771738
//           ],
//           [
//           1703333750317,
//           3.49182129637102
//           ],
//           [
//           1703334050878,
//           3.4951906310176364
//           ],
//           [
//           1703334347890,
//           3.4939837945267236
//           ],
//           [
//           1703334693788,
//           3.463439227184653
//           ],
//           [
//           1703334938689,
//           3.438239166554107
//           ],
//           [
//           1703335251446,
//           3.4113105793585397
//           ],
//           [
//           1703335547817,
//           3.268744897324639
//           ],
//           [
//           1703335817239,
//           3.261183781003551
//           ],
//           [
//           1703336133566,
//           3.2612564473564167
//           ],
//           [
//           1703336414566,
//           3.197830341701474
//           ],
//           [
//           1703336697507,
//           3.194036744203165
//           ],
//           [
//           1703337076993,
//           3.1822221667440105
//           ],
//           [
//           1703337349653,
//           3.178930308289113
//           ],
//           [
//           1703337646510,
//           3.1900086923380067
//           ],
//           [
//           1703337950497,
//           3.205905120882194
//           ],
//           [
//           1703338295355,
//           3.286593911004818
//           ],
//           [
//           1703338542046,
//           3.300681410519359
//           ],
//           [
//           1703338807134,
//           3.303972883327039
//           ],
//           [
//           1703339148371,
//           3.2995374074019237
//           ],
//           [
//           1703339457711,
//           3.22671319312233
//           ],
//           [
//           1703339747106,
//           3.2299344477350114
//           ],
//           [
//           1703340095588,
//           3.2396541316483853
//           ],
//           [
//           1703340322609,
//           3.2654639367821314
//           ],
//           [
//           1703340647334,
//           3.265159432322802
//           ],
//           [
//           1703340910169,
//           3.267608127015029
//           ],
//           [
//           1703341257513,
//           3.2542359636946756
//           ],
//           [
//           1703341547595,
//           3.237051063682069
//           ],
//           [
//           1703341872352,
//           3.242527017115657
//           ],
//           [
//           1703342145434,
//           3.1850692006943833
//           ],
//           [
//           1703342399320,
//           3.1767726209360703
//           ],
//           [
//           1703342686791,
//           3.175118325965304
//           ],
//           [
//           1703343071460,
//           3.1647906177412315
//           ],
//           [
//           1703343353591,
//           3.1221219895573014
//           ],
//           [
//           1703343664149,
//           3.1267262332673895
//           ],
//           [
//           1703343947809,
//           3.1273260023642755
//           ],
//           [
//           1703344248878,
//           3.128471214014759
//           ],
//           [
//           1703344547139,
//           3.1043860209478953
//           ],
//           [
//           1703344811908,
//           3.1016573956352858
//           ],
//           [
//           1703345155655,
//           3.09041733957442
//           ],
//           [
//           1703345441212,
//           3.125393833579811
//           ],
//           [
//           1703345745561,
//           3.167983643354729
//           ],
//           [
//           1703346035604,
//           3.4027036044905827
//           ],
//           [
//           1703346351801,
//           3.3989300814281136
//           ],
//           [
//           1703346662765,
//           3.3760440724755982
//           ],
//           [
//           1703346927188,
//           3.265895137613421
//           ],
//           [
//           1703347295816,
//           3.2770676851074
//           ],
//           [
//           1703347506640,
//           3.281153472497313
//           ],
//           [
//           1703347835770,
//           3.299584576673093
//           ],
//           [
//           1703348152379,
//           3.687365608084087
//           ],
//           [
//           1703348474507,
//           3.7020249231548448
//           ],
//           [
//           1703348710840,
//           3.669490804075061
//           ],
//           [
//           1703349043786,
//           3.81952910967697
//           ],
//           [
//           1703349311309,
//           3.7764409912577737
//           ],
//           [
//           1703349589004,
//           3.7910931020811276
//           ],
//           [
//           1703349917947,
//           3.7762843007571
//           ],
//           [
//           1703350191442,
//           3.79072198187334
//           ],
//           [
//           1703350506423,
//           3.7579593246206593
//           ],
//           [
//           1703350798887,
//           3.690006413354131
//           ],
//           [
//           1703351096179,
//           3.673618120750534
//           ],
//           [
//           1703351404861,
//           3.665880456908667
//           ],
//           [
//           1703351702500,
//           3.4893702522173466
//           ],
//           [
//           1703351986069,
//           3.4856772852540785
//           ],
//           [
//           1703352288739,
//           3.4882732368598544
//           ],
//           [
//           1703352594508,
//           3.504692903000128
//           ],
//           [
//           1703352908146,
//           3.539813527238806
//           ],
//           [
//           1703353175811,
//           3.5699932319952046
//           ],
//           [
//           1703353487128,
//           3.567403520231575
//           ],
//           [
//           1703354461524,
//           3.5430257136105925
//           ],
//           [
//           1703354686576,
//           3.5598854608659924
//           ],
//           [
//           1703355064094,
//           3.5534451642348213
//           ],
//           [
//           1703355277868,
//           3.543469670488963
//           ],
//           [
//           1703355626638,
//           3.4860032663363376
//           ],
//           [
//           1703355889249,
//           3.483143593982356
//           ],
//           [
//           1703356188914,
//           3.4743413556722706
//           ],
//           [
//           1703356507909,
//           3.406084542561729
//           ],
//           [
//           1703356825864,
//           3.3721234655186283
//           ],
//           [
//           1703357092506,
//           3.368162020147597
//           ],
//           [
//           1703357446767,
//           3.3572395236773334
//           ],
//           [
//           1703357696901,
//           3.350455967674305
//           ],
//           [
//           1703358030644,
//           3.3470726766412793
//           ],
//           [
//           1703358294865,
//           3.3563978530628633
//           ],
//           [
//           1703358586057,
//           3.34878035935089
//           ],
//           [
//           1703358892970,
//           3.3515343186505437
//           ],
//           [
//           1703359220309,
//           3.3549683397658305
//           ],
//           [
//           1703359499261,
//           3.287067742741927
//           ],
//           [
//           1703359804099,
//           3.2788469673890495
//           ],
//           [
//           1703360096750,
//           3.277215213323282
//           ],
//           [
//           1703360402859,
//           3.198877671229176
//           ],
//           [
//           1703360697755,
//           3.1999371042447065
//           ],
//           [
//           1703360984677,
//           3.205944522439708
//           ],
//           [
//           1703361298636,
//           3.234187990428906
//           ],
//           [
//           1703361603283,
//           3.2350991493816585
//           ],
//           [
//           1703361889818,
//           3.202984916949011
//           ],
//           [
//           1703362193395,
//           3.2096461602028943
//           ],
//           [
//           1703362496544,
//           3.2037963141250376
//           ],
//           [
//           1703362799093,
//           3.2027076453908183
//           ],
//           [
//           1703363078068,
//           3.204266354027475
//           ],
//           [
//           1703363372494,
//           3.212624031843824
//           ],
//           [
//           1703363688486,
//           3.210823140048868
//           ],
//           [
//           1703363984000,
//           3.219813330434071
//           ]
//         ]
//     },
// ];

// const dataPoints = jsonData[0].prices.map(([timestamp, price]) => ({
//     x: new Date(timestamp),
//     y: price,
// }));


const Chart = () => {
  const tokenChartJsonData = useTokenDetailsStore(state => state.tokenChart);
  
  const dataPoints = tokenChartJsonData.map(([timestamp, price]) => ({
      x: new Date(timestamp),
      y: price,
  }));
  const labelFontColor = useColorModeValue('gray', '#dfe5ed');

  useEffect(() => {
    // Sample CanvasJS chart code
    const chart = new window.CanvasJS.Chart("chartContainer", {
      // Your chart configuration options
      backgroundColor: 'transparent', 
      axisX: {
        lineThickness: 0,
        labelFontColor: labelFontColor, // Change color of X-axis labels
        valueFormatString: 'DD MMM',
      },
      axisY: {
        gridColor: 'rgba(145, 162, 184, 0.2)',
        lineThickness: 0,
        labelFontColor: labelFontColor, // Change color of X-axis labels
      },
      animationEnabled: true,
      zoomEnabled: true,
      data: [
        {
          type: 'area',
          fillOpacity: 0.1,
          color: '#912f13',
          dataPoints: dataPoints,
        },
      ],
    });

    chart.render();
  }, []);
  
  return (
    <Box p={{ md:3 }} minW={'100%'}>
      <div id="chartContainer" style={{ height: "400px", minWidth:"100%" }}></div>
    </Box>
  );
}

export default Chart