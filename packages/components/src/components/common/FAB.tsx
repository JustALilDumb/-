import React, { useRef, useState } from 'react'
import { StyleProp, TextStyle } from 'react-native'

import { useHover } from '../../hooks/use-hover'
import { IconProp } from '../../libs/vector-icons'
import { sharedStyles } from '../../styles/shared'
import {
  contentPadding,
  normalTextSize,
  scaleFactor,
} from '../../styles/variables'
import { ThemedIcon } from '../themed/ThemedIcon'
import { ThemedText } from '../themed/ThemedText'
import {
  ThemedTouchableOpacity,
  ThemedTouchableOpacityProps,
} from '../themed/ThemedTouchableOpacity'
import { ThemedView } from '../themed/ThemedView'

export const fabSize = 44 * scaleFactor
export const fabSpacing = contentPadding / 2 // + Math.max(0, (fabSize - defaultButtonSize) / 2) - 2

export interface FABProps extends ThemedTouchableOpacityProps {
  children?: string | React.ReactElement<any>
  icon?: IconProp & { style?: StyleProp<TextStyle> | any }
  onPress: ThemedTouchableOpacityProps['onPress']
  tooltip: string
  useBrandColor?: boolean
}

export function FAB(props: FABProps) {
  const { children, icon, style, tooltip, useBrandColor, ...otherProps } = props

  const [isPressing, setIsPressing] = useState(false)

  const touchableRef = useRef(null)
  const isHovered = useHover(touchableRef)

  return (
    <ThemedTouchableOpacity
      ref={touchableRef}
      analyticsCategory="fab"
      {...otherProps}
      backgroundColor={
        useBrandColor ? 'primaryBackgroundColor' : 'backgroundColorLess1'
      }
      hitSlop={{
        top: contentPadding / 2,
        bottom: contentPadding / 2,
        left: contentPadding,
        right: contentPadding,
      }}
      onPressIn={() => setIsPressing(true)}
      onPressOut={() => setIsPressing(false)}
      style={[
        {
          width: fabSize,
          height: fabSize,
          borderRadius: fabSize / 2,
          shadowColor: '#000000',
          shadowOffset: {
            width: 0,
            height: isHovered || (isPressing ? 6 : 3) * scaleFactor,
          },
          shadowOpacity: 0.2,
          shadowRadius: 6,
          zIndex: 1,
          overflow: 'hidden',
        },
        style,
      ]}
      tooltip={tooltip}
    >
      <ThemedView
        backgroundColor={
          !!(isHovered || isPressing)
            ? useBrandColor
              ? 'backgroundColorTransparent10'
              : 'backgroundColorLess2'
            : undefined
        }
        style={[
          sharedStyles.flex,
          sharedStyles.alignItemsCenter,
          sharedStyles.justifyContentCenter,
          sharedStyles.overflowHidden,
          {
            width: fabSize,
            height: fabSize,
            borderRadius: fabSize / 2,
          },
        ]}
      >
        {!!(icon && icon.name) ? (
          <ThemedIcon
            {...icon}
            color={useBrandColor ? 'primaryForegroundColor' : 'foregroundColor'}
            style={[
              {
                width: fabSize / 2,
                height: fabSize / 2,
                lineHeight: fabSize / 2,
                marginTop: 1,
                fontSize: fabSize / 2,
                textAlign: 'center',
              },
              icon.style,
            ]}
          />
        ) : typeof children === 'string' ? (
          <ThemedText
            color={useBrandColor ? 'primaryForegroundColor' : 'foregroundColor'}
            style={{
              fontSize: normalTextSize,
              lineHeight: normalTextSize,
              fontWeight: '500',
            }}
          >
            {children}
          </ThemedText>
        ) : (
          children
        )}
      </ThemedView>
    </ThemedTouchableOpacity>
  )
}
