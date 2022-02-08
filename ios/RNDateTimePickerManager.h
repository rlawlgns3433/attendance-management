
#import <React/RCTConvert.h>
#import <React/RCTViewManager.h>

@interface RCTConvert(UIDatePicker)

+ (UIDatePickerMode)UIDatePickerMode:(id)json;

@end

@interface RNDateTimePickerManager : RCTViewManager

@end