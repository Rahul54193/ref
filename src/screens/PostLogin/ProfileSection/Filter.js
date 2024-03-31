// import {CustomInput, Spacer} from '@app/components';
// import React, {useState} from 'react';
// import {Modal, Pressable, ScrollView, View} from 'react-native';
// import {List} from 'react-native-paper';

// const filter = ({isFilter, setIsFilter}) => {
//   const [isFilter, setIsFilter] = useState();
//   const initialState = {
//     min_price: null,
//     max_price: null,
//     brands: null,
//   };
//   const data = [
//     {id:1,
//     name : 'LDCKD'
//     },
//     {id:2, name : 'LDKDD'},
//     {id:3, name : 'jfjff'},
//     {id:4, name : 'LDMFV'},
//     {id:5, name : 'MDCD<'},
//     {id:6, name : 'LMDNV'},
//     {id:7, name : 'KAKdkj'},
//     {id:8, name : 'mMDKDD'},
//   ];

//   const getFilterTab = () => {
//     return (
//       <ScrollView>
//         <View
//           style={{
//             flexDirection: 'row',
//             justifyContent: 'center',
//             paddingVertical: 20,
//             width: '90%',
//             height: 100,
//           }}>
//           <View style={{justifyContent: 'center', width: '45%'}}>
//             <CustomInput
//               label="Min Price"
//               placeholder="Min Price"
//               returnType="next"
//               leftIconAffix={<TextInput.Affix text="$" />}
//             />
//           </View>
//           <Spacer width={10} />
//           <View style={{justifyContent: 'center', width: '45%'}}>
//             <CustomInput
//               label="Max Price"
//               placeholder="Max Price"
//               keyboardType="next"
//               leftIconAffix={<TextInput.Affix text="$" />}
//             />
//           </View>
//         </View>
//         <List.Accordion
//           titleStyle={{color: '#636363'}}
//           title="Brands"
//           id="1">
//             {data.map(item=>{
//               return(
//                 <List.Item
//                 key={'key-'+item?.id}
//                 title={item?.name}
//                 onPress={}
//               )
//             })}
//           </List.Accordion>
//       </ScrollView>
//     );
//   };
//   return (
//     <Modal
//       animationType="slide"
//       transparent
//       visible={isFilter}
//       onDismiss={() => setIsFilter(false)}>
//       <Pressable
//         style={{flex: 1, backgroundColor: '#00000030'}}
//         onPress={() => setIsFilter(false)}>
//         <View />
//       </Pressable>
//       <View style={{height: '90%', backgroundColor: '#ffffff', bottom: 0}}>
//         <View style={{flex: 1}}>
//           <View style={{flexDirection: ''}}></View>
//         </View>
//       </View>
//     </Modal>
//   );
// };
