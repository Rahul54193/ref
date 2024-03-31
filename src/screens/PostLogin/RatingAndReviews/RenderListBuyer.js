import CustomIcon, { ICON_TYPE } from "@app/components/CustomIcon";
import { RoutesName } from "@app/helper/strings";
import NavigationService from "@app/navigations/NavigationService";
import { COLORS } from "@app/resources";
import moment from "moment";
import { Pressable, Text, View } from "react-native";

export function RenderItemBuyer({ item, index }) {
    function formatDate(inputDate) {
        const months = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];

        const dateParts = inputDate.split('T')[0].split('-');
        const year = parseInt(dateParts[0]);
        const monthIndex = parseInt(dateParts[1]) - 1;
        const day = parseInt(dateParts[2]);

        const formattedDate = `${day} ${months[monthIndex]}, ${year}`;
        return formattedDate;
    }
    const onRowClick = () => {
        //
    };

    function getShortName(fullName) {
        const names = fullName.split(' ');

        const size = names.length;
        const first_char = names[0].charAt(0);
        const Last_Char = names[size - 1].charAt(0);

        const shortName = first_char + Last_Char;
        return shortName;
    }

    const changedDate = () => {
        return moment(date).format("DD MMM YYYY")
    }
    console.log(item?.rated_user?.name, "item================")

    return (
        <View>
            <View style={{ marginTop: 25 }}>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}>
                    <View style={{ flexDirection: 'row' }}>
                        <View
                            style={{
                                height: 32,
                                width: 32,
                                borderRadius: 16,
                                backgroundColor: '#FF7575',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            <Text
                                style={{
                                    color: COLORS.WHITE,
                                    fontSize: 13.5,
                                    fontFamily: 'Cabin-SemiBold',

                                }}>
                                {getShortName(item?.rated_user?.name)}

                            </Text>
                        </View>
                        <Pressable onPress={() => {
                            NavigationService.navigate(
                                RoutesName.PORFILE_SECTION_SCREEN_OTHERS,
                                { userId: item?.rated_user?.id },
                            );

                        }}>
                            <Text
                                style={{
                                    marginLeft: 15,
                                    fontSize: 16,
                                    color: COLORS.BLACK,
                                    fontFamily: 'Cabin-Regular',
                                }}>
                                {`@${item?.rated_user?.user_id_tag}`}
                            </Text>
                        </Pressable>
                    </View>
                    <View
                        style={{
                            height: 22,
                            width: 45,
                            backgroundColor: '#028006',
                            alignContent: 'center',
                            flexDirection: 'row',
                            justifyContent: 'space-evenly',
                            borderRadius: 5

                        }}>
                        <Text style={{ color: COLORS.WHITE, fontFamily: 'OpenSans-SemiBold' }}>{item?.rating}</Text>
                        <CustomIcon

                            origin={ICON_TYPE.ENTYPO}
                            name={'star'}
                            color={'white'}
                            size={12}
                            style={{ marginTop: 5 }}
                        />
                    </View>
                </View>
            </View>
            <View>
                <Text
                    style={{
                        fontFamily: 'OpenSans-Regular',
                        fontSize: 12,
                    }}>
                    {item?.description}
                </Text>
                <Text
                    style={{
                        fontFamily: 'OpenSans-SemiBold',
                        fontSize: 11,
                        color: COLORS.HYPERLINK,
                    }}>
                    {formatDate(item.created_at)}
                </Text>
            </View>
            <View
                style={{
                    height: 2,
                    backgroundColor: '#707070',
                    opacity: 0.25,
                    marginTop: 5,
                }}></View>
        </View>
    );
}