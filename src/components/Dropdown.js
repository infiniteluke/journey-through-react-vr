import React from 'react';
import PropTypes from 'prop-types';
import { asset, Image, Text, View, VrButton } from 'react-vr';
import Downshift from 'downshift';

function getDropdownItemBgColor(selectedItem, item, highlightedIndex, index) {
  if (selectedItem === item) {
    return 'gray';
  }
  if (highlightedIndex === index) {
    return 'lightgray';
  }
  return 'white';
}

function Dropdown({ items, placeholder }) {
  return (
    <Downshift
      render={({
        // Prop getters
        getRootProps,
        getItemProps,
        // Actions
        selectItem,
        toggleMenu,
        setHighlightedIndex,
        // State
        isOpen,
        highlightedIndex,
        selectedItem,
      }) => (
        <View
          style={{
            layoutOrigin: [0.5, 0.5],
            transform: [{ translate: [0, 0, -3] }],
          }}
          billboarding={'on'}
          {...getRootProps(
            {},
            {
              suppressRefError: true,
            }
          )}
        >
          <VrButton
            onClick={toggleMenu}
            style={{
              display: 'flex',
              flexDirection: 'row',
              backgroundColor: 'white',
              justifyContent: 'space-between',
              alignItems: 'stretch',
              height: 0.7,
              width: 3,
              paddingLeft: 0.2,
            }}
          >
            <Text
              style={{
                backgroundColor: 'white',
                color:
                  !selectedItem || Boolean(highlightedIndex) ? 'grey' : 'black',
                fontSize: 0.3,
                fontWeight: '400',
                textAlign: 'center',
                textAlignVertical: 'center',
              }}
            >
              {items[highlightedIndex] || selectedItem || placeholder}
            </Text>
            <View
              style={{
                paddingRight: 0.2,
                paddingLeft: 0.2,
                backgroundColor: 'gray',
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row',
              }}
            >
              <Image
                source={asset('arrow.png')}
                style={{
                  justifyContent: 'center',
                  width: 0.5,
                  height: 0.5,
                }}
              />
            </View>
          </VrButton>
          {isOpen ? (
            <View
              style={{
                width: 3,
                backgroundColor: 'white',
                transform: [
                  {
                    translate: [0, -1.3, -0.3],
                  },
                ],
              }}
            >
              {items.map((item, index) => (
                <VrButton
                  {...getItemProps({
                    item,
                  })}
                  onEnter={() => setHighlightedIndex(index)}
                  onClick={() => selectItem(item)}
                  key={item}
                >
                  <Text
                    style={{
                      fontSize: 0.3,
                      paddingTop: 0.1,
                      paddingBottom: 0.1,
                      paddingLeft: 0.1,
                      paddingRight: 0.1,
                      textAlign: 'center',
                      textAlignVertical: 'center',
                      color: 'black',
                      backgroundColor: getDropdownItemBgColor(
                        selectedItem,
                        item,
                        highlightedIndex,
                        index
                      ),
                    }}
                  >
                    {item}
                  </Text>
                </VrButton>
              ))}
            </View>
          ) : null}
        </View>
      )}
    />
  );
}

Dropdown.propTypes = {
  items: PropTypes.array.isRequired,
  placeholder: PropTypes.string,
};

Dropdown.defaultProps = {
  placeholder: 'Select an item',
};

export default Dropdown;
