function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var time_picker_common_1 = require("./time-picker-common");
var utils_1 = require("../../utils/utils");
var getter = utils_1.ios.getter;
__export(require("./time-picker-common"));
function getDate(hour, minute) {
    var components = NSDateComponents.alloc().init();
    components.hour = hour;
    components.minute = minute;
    return getter(NSCalendar, NSCalendar.currentCalendar).dateFromComponents(components);
}
function getComponents(date) {
    return getter(NSCalendar, NSCalendar.currentCalendar).componentsFromDate(32 | 64, date);
}
var TimePicker = (function (_super) {
    __extends(TimePicker, _super);
    function TimePicker() {
        var _this = _super.call(this) || this;
        _this._ios = UIDatePicker.new();
        _this._ios.datePickerMode = 0;
        _this._changeHandler = UITimePickerChangeHandlerImpl.initWithOwner(new WeakRef(_this));
        _this._ios.addTargetActionForControlEvents(_this._changeHandler, "valueChanged", 4096);
        var components = getComponents(NSDate.date());
        _this.hour = components.hour;
        _this.minute = components.minute;
        _this.nativeView = _this._ios;
        return _this;
    }
    Object.defineProperty(TimePicker.prototype, "ios", {
        get: function () {
            return this._ios;
        },
        enumerable: true,
        configurable: true
    });
    TimePicker.prototype[time_picker_common_1.timeProperty.getDefault] = function () {
        return this.nativeView.date;
    };
    TimePicker.prototype[time_picker_common_1.timeProperty.setNative] = function (value) {
        this.nativeView.date = getDate(this.hour, this.minute);
    };
    TimePicker.prototype[time_picker_common_1.minuteProperty.getDefault] = function () {
        return this.nativeView.date.getMinutes();
    };
    TimePicker.prototype[time_picker_common_1.minuteProperty.setNative] = function (value) {
        this.nativeView.date = getDate(this.hour, value);
    };
    TimePicker.prototype[time_picker_common_1.hourProperty.getDefault] = function () {
        return this.nativeView.date.getHours();
    };
    TimePicker.prototype[time_picker_common_1.hourProperty.setNative] = function (value) {
        this.nativeView.date = getDate(value, this.minute);
    };
    TimePicker.prototype[time_picker_common_1.minHourProperty.getDefault] = function () {
        return this.nativeView.minimumDate ? this.nativeView.minimumDate.getHours() : 0;
    };
    TimePicker.prototype[time_picker_common_1.minHourProperty.setNative] = function (value) {
        this.nativeView.minimumDate = getDate(value, this.minute);
    };
    TimePicker.prototype[time_picker_common_1.maxHourProperty.getDefault] = function () {
        return this.nativeView.maximumDate ? this.nativeView.maximumDate.getHours() : 24;
    };
    TimePicker.prototype[time_picker_common_1.maxHourProperty.setNative] = function (value) {
        this.nativeView.maximumDate = getDate(value, this.minute);
    };
    TimePicker.prototype[time_picker_common_1.minMinuteProperty.getDefault] = function () {
        return this.nativeView.minimumDate ? this.nativeView.minimumDate.getMinutes() : 0;
    };
    TimePicker.prototype[time_picker_common_1.minMinuteProperty.setNative] = function (value) {
        this.nativeView.minimumDate = getDate(this.hour, value);
    };
    TimePicker.prototype[time_picker_common_1.maxMinuteProperty.getDefault] = function () {
        return this.nativeView.maximumDate ? this.nativeView.maximumDate.getMinutes() : 60;
    };
    TimePicker.prototype[time_picker_common_1.maxMinuteProperty.setNative] = function (value) {
        this.nativeView.maximumDate = getDate(this.hour, value);
    };
    TimePicker.prototype[time_picker_common_1.timeProperty.getDefault] = function () {
        return this.nativeView.minuteInterval;
    };
    TimePicker.prototype[time_picker_common_1.timeProperty.setNative] = function (value) {
        this.nativeView.minuteInterval = value;
    };
    TimePicker.prototype[time_picker_common_1.colorProperty.getDefault] = function () {
        return this.nativeView.valueForKey("textColor");
    };
    TimePicker.prototype[time_picker_common_1.colorProperty.setNative] = function (value) {
        var color = value instanceof time_picker_common_1.Color ? value.ios : value;
        this.nativeView.setValueForKey(color, "textColor");
    };
    return TimePicker;
}(time_picker_common_1.TimePickerBase));
exports.TimePicker = TimePicker;
var UITimePickerChangeHandlerImpl = (function (_super) {
    __extends(UITimePickerChangeHandlerImpl, _super);
    function UITimePickerChangeHandlerImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UITimePickerChangeHandlerImpl.initWithOwner = function (owner) {
        var handler = UITimePickerChangeHandlerImpl.new();
        handler._owner = owner;
        return handler;
    };
    UITimePickerChangeHandlerImpl.prototype.valueChanged = function (sender) {
        var owner = this._owner.get();
        if (!owner) {
            return;
        }
        var components = getComponents(sender.date);
        var timeChanged = false;
        if (components.hour !== owner.hour) {
            time_picker_common_1.hourProperty.nativeValueChange(owner, components.hour);
            timeChanged = true;
        }
        if (components.minute !== owner.minute) {
            time_picker_common_1.minuteProperty.nativeValueChange(owner, components.minute);
            timeChanged = true;
        }
        if (timeChanged) {
            time_picker_common_1.timeProperty.nativeValueChange(owner, new Date(0, 0, 0, components.hour, components.minute));
        }
    };
    return UITimePickerChangeHandlerImpl;
}(NSObject));
UITimePickerChangeHandlerImpl.ObjCExposedMethods = {
    'valueChanged': { returns: interop.types.void, params: [UIDatePicker] }
};
//# sourceMappingURL=time-picker.ios.js.map