import moment from 'moment';
import {fire} from 'react-native-alertbox';

export function addEllipsis(text, maxLength) {
  if (text && text?.length > maxLength) {
    return text.substring(0, maxLength) + '...';
  }
  return text;
}

export function formatTimestamp(timestamp) {
  const currentTime = moment.utc();
  const postTime = moment.utc(timestamp);
  const daysAgo = currentTime.diff(postTime, 'days');

  const formattedTime = daysAgo === 1 ? '1 day ago' : `${daysAgo} days ago`;
  return `Posted ${formattedTime}`;
}

export const showAlert = ({title = '', message = '', actions}) =>
  fire({
    title: `${title}`,
    message: `${message}`,
    actions: actions
      ? actions
      : [
          {
            text: 'Ok',
            style: 'cancel',
          },
        ],
  });

export const capitalizeFirstLetter = str => {
  if (typeof str !== 'string' || str.length === 0) {
    return str; // Return the original value if it's not a string or an empty string
  }

  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const mergeArrays = (baseArray, newArray) => {
  // Check if either baseArray or newArray is null
  if (baseArray === null && newArray === null) {
    return [];
  } else if (baseArray === null) {
    return newArray;
  } else if (newArray === null) {
    return baseArray;
  }

  // Check if either baseArray or newArray is empty
  if (baseArray.length === 0) {
    return newArray;
  } else if (newArray.length === 0) {
    return baseArray;
  }

  const mergedArray = baseArray.map(baseItem => {
    const matchingItem = newArray.find(newItem => newItem.id === baseItem.id);
    return matchingItem ? {...baseItem, ...matchingItem} : baseItem;
  });

  const newItems = newArray.filter(
    newItem => !baseArray.some(baseItem => baseItem.id === newItem.id),
  );

  return [...mergedArray, ...newItems];
};

export function addObjectAndUpdate(objArray, newObject) {
  const index = objArray.findIndex(obj => {
    return obj.id === newObject.id;
  });

  if (index !== -1) {
    // Update the existing object
    objArray[index] = newObject;
  } else {
    // Add the new object at the start of the array
    objArray.unshift(newObject);
  }

  return objArray;
}

export function getTimeDifferenceString(date) {
  const now = new Date();
  const timestamp = new Date(date);

  const timeDifferenceInSeconds = Math.floor((now - timestamp) / 1000);

  if (timeDifferenceInSeconds < 60) {
    return 'few seconds ago';
  } else if (timeDifferenceInSeconds < 3600) {
    const minutes = Math.floor(timeDifferenceInSeconds / 60);
    return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
  } else if (timeDifferenceInSeconds < 86400) {
    const hours = Math.floor(timeDifferenceInSeconds / 3600);
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  } else if (timeDifferenceInSeconds < 172800) {
    // 24 * 60 * 60 seconds in a day
    return 'yesterday';
  } else if (timeDifferenceInSeconds < 604800) {
    const days = Math.floor(timeDifferenceInSeconds / 86400);
    return `${days} ${days === 1 ? 'day' : 'days'} ago`;
  } else if (timeDifferenceInSeconds < 2419200) {
    const weeks = Math.floor(timeDifferenceInSeconds / 604800);
    return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
  } else if (timeDifferenceInSeconds < 29030400) {
    const months = Math.floor(timeDifferenceInSeconds / 2419200);
    return `${months} ${months === 1 ? 'month' : 'months'} ago`;
  } else {
    const years = Math.floor(timeDifferenceInSeconds / 29030400);
    return `${years} ${years === 1 ? 'year' : 'years'} ago`;
  }
}

/**
 * Function to group messages by date
 *
 * @key created_at
 * @messages List of messages
 *
 **/
export function groupMessagesByDate(messages, key) {
  const groupedMessages = [];

  // Create an object to store messages by date
  const messagesByDate = {};

  messages.forEach(message => {
    const date = moment(message?.[key]).format('YYYY/MM/DD');

    if (!messagesByDate[date]) {
      messagesByDate[date] = [];
    }

    messagesByDate[date].push(message);
  });

  // Convert the object into the desired array format
  for (const date in messagesByDate) {
    groupedMessages.push({
      title: date,
      data: messagesByDate[date],
    });
  }

  return groupedMessages;
}

// Transform the fetched messages into the GiftedChat format
export const transformedMessages = messages => {
  const transformed = messages?.map(message => ({
    offer_action: message.offer_action,
    _id: message.id,
    text: message?.message,
    user: {
      _id: message.sender_id,
    },
    image: message.type === 'image' ? message?.docs : null,
    video: message.type === 'video' ? message?.docs : null,
    file: {
      url: message.type === 'pdf' ? message?.docs : null,
    },
    quickReplies:
      message.type === 'make_offer'
        ? {
            type: 'radio', // or 'checkbox',
            keepIt: true,
            values: [
              {
                title: '😋 Yes',
                value: 'yes',
              },
              {
                title: '📷 Yes, let me show you with a picture!',
                value: 'yes_picture',
              },
              {
                title: '😞 Nope. What?',
                value: 'no',
              },
            ],
          }
        : null,
    createdAt: new Date(message.created_at),
    isOfferAccepted: message?.isOfferAccepted,
  }));
  return transformed;
};

export function FormattedNumber(number) {
  const [integerPart, decimalPart] = number.split('.');
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    const formattedDecimal = decimalPart == 0 ? '': `.${decimalPart.slice(0, 2)}`;
    const formattedNumber = `${formattedInteger}${formattedDecimal}`;
    return formattedNumber;
}

export function formatDateToYearMonth(date) {
  const formattedDate = moment(date).format('YYYY MMM');
  return formattedDate;
}
