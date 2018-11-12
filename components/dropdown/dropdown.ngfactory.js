"use strict";
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
Object.defineProperty(exports, "__esModule", { value: true });
var i0 = require("@angular/core");
var i1 = require("./dropdown");
var i2 = require("@angular/common");
var i3 = require("../common/shared");
var i4 = require("@angular/forms");
var i5 = require("../dom/domhandler");
var i6 = require("../utils/objectutils");
var DropdownModuleNgFactory = i0.ɵcmf(i1.DropdownModule, [], function (_l) { return i0.ɵmod([i0.ɵmpd(512, i0.ComponentFactoryResolver, i0.ɵCodegenComponentFactoryResolver, [[8, []], [3, i0.ComponentFactoryResolver], i0.NgModuleRef]), i0.ɵmpd(4608, i2.NgLocalization, i2.NgLocaleLocalization, [i0.LOCALE_ID, [2, i2.ɵangular_packages_common_common_a]]), i0.ɵmpd(1073742336, i2.CommonModule, i2.CommonModule, []), i0.ɵmpd(1073742336, i3.SharedModule, i3.SharedModule, []), i0.ɵmpd(1073742336, i1.DropdownModule, i1.DropdownModule, [])]); });
exports.DropdownModuleNgFactory = DropdownModuleNgFactory;
var styles_Dropdown = [];
var RenderType_Dropdown = i0.ɵcrt({ encapsulation: 2, styles: styles_Dropdown, data: { "animation": [{ type: 7, name: "overlayAnimation", definitions: [{ type: 0, name: "void", styles: { type: 6, styles: { transform: "translateY(5%)", opacity: 0 }, offset: null }, options: undefined }, { type: 0, name: "visible", styles: { type: 6, styles: { transform: "translateY(0)", opacity: 1 }, offset: null }, options: undefined }, { type: 1, expr: "void => visible", animation: { type: 4, styles: null, timings: "{{showTransitionParams}}" }, options: null }, { type: 1, expr: "visible => void", animation: { type: 4, styles: null, timings: "{{hideTransitionParams}}" }, options: null }], options: {} }] } });
exports.RenderType_Dropdown = RenderType_Dropdown;
function View_Dropdown_2(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 1, "option", [], null, null, null, null, null)), (_l()(), i0.ɵted(1, null, ["", ""]))], null, function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.placeholder; _ck(_v, 1, 0, currVal_0); }); }
function View_Dropdown_5(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 1, "option", [], [[8, "value", 0], [8, "selected", 0]], null, null, null, null)), (_l()(), i0.ɵted(1, null, ["", ""]))], null, function (_ck, _v) { var _co = _v.component; var currVal_0 = _v.context.$implicit.value; var currVal_1 = (_co.selectedOption == _v.context.$implicit); _ck(_v, 0, 0, currVal_0, currVal_1); var currVal_2 = _v.context.$implicit.label; _ck(_v, 1, 0, currVal_2); }); }
function View_Dropdown_4(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 2, "optgroup", [], [[1, "label", 0]], null, null, null, null)), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_Dropdown_5)), i0.ɵdid(2, 278528, null, 0, i2.NgForOf, [i0.ViewContainerRef, i0.TemplateRef, i0.IterableDiffers], { ngForOf: [0, "ngForOf"] }, null)], function (_ck, _v) { var currVal_1 = _v.context.$implicit.items; _ck(_v, 2, 0, currVal_1); }, function (_ck, _v) { var currVal_0 = _v.context.$implicit.label; _ck(_v, 0, 0, currVal_0); }); }
function View_Dropdown_3(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 3, null, null, null, null, null, null, null)), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_Dropdown_4)), i0.ɵdid(2, 278528, null, 0, i2.NgForOf, [i0.ViewContainerRef, i0.TemplateRef, i0.IterableDiffers], { ngForOf: [0, "ngForOf"] }, null), (_l()(), i0.ɵeld(3, 0, null, null, 0, "optgroup", [], null, null, null, null, null))], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.options; _ck(_v, 2, 0, currVal_0); }, null); }
function View_Dropdown_7(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 1, "option", [], [[8, "value", 0], [8, "selected", 0]], null, null, null, null)), (_l()(), i0.ɵted(1, null, ["", ""]))], null, function (_ck, _v) { var _co = _v.component; var currVal_0 = _v.context.$implicit.value; var currVal_1 = (_co.selectedOption == _v.context.$implicit); _ck(_v, 0, 0, currVal_0, currVal_1); var currVal_2 = _v.context.$implicit.label; _ck(_v, 1, 0, currVal_2); }); }
function View_Dropdown_6(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 2, null, null, null, null, null, null, null)), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_Dropdown_7)), i0.ɵdid(2, 278528, null, 0, i2.NgForOf, [i0.ViewContainerRef, i0.TemplateRef, i0.IterableDiffers], { ngForOf: [0, "ngForOf"] }, null), (_l()(), i0.ɵand(0, null, null, 0))], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.options; _ck(_v, 2, 0, currVal_0); }, null); }
function View_Dropdown_1(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 7, "div", [["class", "ui-helper-hidden-accessible"]], null, null, null, null, null)), (_l()(), i0.ɵeld(1, 0, null, null, 6, "select", [["aria-hidden", "true"], ["tabindex", "-1"]], [[1, "id", 0], [8, "required", 0], [1, "name", 0], [1, "aria-label", 0]], null, null, null, null)), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_Dropdown_2)), i0.ɵdid(3, 16384, null, 0, i2.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_Dropdown_3)), i0.ɵdid(5, 16384, null, 0, i2.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_Dropdown_6)), i0.ɵdid(7, 16384, null, 0, i2.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_4 = _co.placeholder; _ck(_v, 3, 0, currVal_4); var currVal_5 = _co.group; _ck(_v, 5, 0, currVal_5); var currVal_6 = !_co.group; _ck(_v, 7, 0, currVal_6); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.selectId; var currVal_1 = _co.required; var currVal_2 = _co.name; var currVal_3 = (_co.selectedOption ? _co.selectedOption.label : " "); _ck(_v, 1, 0, currVal_0, currVal_1, currVal_2, currVal_3); }); }
function View_Dropdown_9(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 1, null, null, null, null, null, null, null)), (_l()(), i0.ɵted(1, null, ["", ""]))], null, function (_ck, _v) { var _co = _v.component; var currVal_0 = (_co.label || "empty"); _ck(_v, 1, 0, currVal_0); }); }
function View_Dropdown_10(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 0, null, null, null, null, null, null, null))], null, null); }
function View_Dropdown_8(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 7, "label", [], null, null, null, null, null)), i0.ɵdid(1, 278528, null, 0, i2.NgClass, [i0.IterableDiffers, i0.KeyValueDiffers, i0.ElementRef, i0.Renderer2], { ngClass: [0, "ngClass"] }, null), i0.ɵpod(2, { "ui-dropdown-label ui-inputtext ui-corner-all": 0, "ui-dropdown-label-empty": 1 }), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_Dropdown_9)), i0.ɵdid(4, 16384, null, 0, i2.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵand(16777216, null, null, 2, null, View_Dropdown_10)), i0.ɵdid(6, 540672, null, 0, i2.NgTemplateOutlet, [i0.ViewContainerRef], { ngTemplateOutletContext: [0, "ngTemplateOutletContext"], ngTemplateOutlet: [1, "ngTemplateOutlet"] }, null), i0.ɵpod(7, { $implicit: 0 })], function (_ck, _v) { var _co = _v.component; var currVal_0 = _ck(_v, 2, 0, true, ((_co.label == null) || (_co.label.length === 0))); _ck(_v, 1, 0, currVal_0); var currVal_1 = !_co.selectedItemTemplate; _ck(_v, 4, 0, currVal_1); var currVal_2 = _ck(_v, 7, 0, _co.selectedOption); var currVal_3 = _co.selectedItemTemplate; _ck(_v, 6, 0, currVal_2, currVal_3); }, null); }
function View_Dropdown_11(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 3, "label", [], null, null, null, null, null)), i0.ɵdid(1, 278528, null, 0, i2.NgClass, [i0.IterableDiffers, i0.KeyValueDiffers, i0.ElementRef, i0.Renderer2], { ngClass: [0, "ngClass"] }, null), i0.ɵpod(2, { "ui-dropdown-label ui-inputtext ui-corner-all ui-placeholder": 0, "ui-dropdown-label-empty": 1 }), (_l()(), i0.ɵted(3, null, ["", ""]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = _ck(_v, 2, 0, true, ((_co.placeholder == null) || (_co.placeholder.length === 0))); _ck(_v, 1, 0, currVal_0); }, function (_ck, _v) { var _co = _v.component; var currVal_1 = (_co.placeholder || "empty"); _ck(_v, 3, 0, currVal_1); }); }
function View_Dropdown_12(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, [[5, 0], ["editableInput", 1]], null, 0, "input", [["class", "ui-dropdown-label ui-inputtext ui-corner-all"], ["type", "text"]], [[1, "aria-label", 0], [8, "disabled", 0], [1, "placeholder", 0]], [[null, "click"], [null, "input"], [null, "focus"], [null, "blur"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.onEditableInputClick($event) !== false);
        ad = (pd_0 && ad);
    } if (("input" === en)) {
        var pd_1 = (_co.onEditableInputChange($event) !== false);
        ad = (pd_1 && ad);
    } if (("focus" === en)) {
        var pd_2 = (_co.onEditableInputFocus($event) !== false);
        ad = (pd_2 && ad);
    } if (("blur" === en)) {
        var pd_3 = (_co.onInputBlur($event) !== false);
        ad = (pd_3 && ad);
    } return ad; }, null, null))], null, function (_ck, _v) { var _co = _v.component; var currVal_0 = (_co.selectedOption ? _co.selectedOption.label : " "); var currVal_1 = _co.disabled; var currVal_2 = _co.placeholder; _ck(_v, 0, 0, currVal_0, currVal_1, currVal_2); }); }
function View_Dropdown_13(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 0, "i", [["class", "ui-dropdown-clear-icon pi pi-times"]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.clear($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null))], null, null); }
function View_Dropdown_15(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 2, "div", [["class", "ui-dropdown-filter-container"]], null, [[null, "input"], [null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("input" === en)) {
        var pd_0 = (_co.onFilter($event) !== false);
        ad = (pd_0 && ad);
    } if (("click" === en)) {
        var pd_1 = ($event.stopPropagation() !== false);
        ad = (pd_1 && ad);
    } return ad; }, null, null)), (_l()(), i0.ɵeld(1, 0, [[2, 0], ["filter", 1]], null, 0, "input", [["autocomplete", "off"], ["class", "ui-dropdown-filter ui-inputtext ui-widget ui-state-default ui-corner-all"], ["type", "text"]], [[8, "value", 0], [1, "placeholder", 0]], [[null, "keydown.enter"], [null, "input"], [null, "keydown"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("keydown.enter" === en)) {
        var pd_0 = ($event.preventDefault() !== false);
        ad = (pd_0 && ad);
    } if (("input" === en)) {
        var pd_1 = (_co.dropDownFilter($event.target.value) !== false);
        ad = (pd_1 && ad);
    } if (("keydown" === en)) {
        var pd_2 = (_co.onKeydown($event, false) !== false);
        ad = (pd_2 && ad);
    } return ad; }, null, null)), (_l()(), i0.ɵeld(2, 0, null, null, 0, "span", [["class", "ui-dropdown-filter-icon pi pi-search"]], null, null, null, null, null))], null, function (_ck, _v) { var _co = _v.component; var currVal_0 = (_co.filterValue || ""); var currVal_1 = _co.filterPlaceholder; _ck(_v, 1, 0, currVal_0, currVal_1); }); }
function View_Dropdown_18(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 1, "span", [], null, null, null, null, null)), (_l()(), i0.ɵted(1, null, ["", ""]))], null, function (_ck, _v) { var currVal_0 = (_v.parent.context.$implicit.label || "empty"); _ck(_v, 1, 0, currVal_0); }); }
function View_Dropdown_19(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 0, null, null, null, null, null, null, null))], null, null); }
function View_Dropdown_20(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 0, null, null, null, null, null, null, null))], null, null); }
function View_Dropdown_17(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 5, "li", [["class", "ui-dropdown-item-group"]], null, null, null, null, null)), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_Dropdown_18)), i0.ɵdid(2, 16384, null, 0, i2.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵand(16777216, null, null, 2, null, View_Dropdown_19)), i0.ɵdid(4, 540672, null, 0, i2.NgTemplateOutlet, [i0.ViewContainerRef], { ngTemplateOutletContext: [0, "ngTemplateOutletContext"], ngTemplateOutlet: [1, "ngTemplateOutlet"] }, null), i0.ɵpod(5, { $implicit: 0 }), (_l()(), i0.ɵand(16777216, null, null, 2, null, View_Dropdown_20)), i0.ɵdid(7, 540672, null, 0, i2.NgTemplateOutlet, [i0.ViewContainerRef], { ngTemplateOutletContext: [0, "ngTemplateOutletContext"], ngTemplateOutlet: [1, "ngTemplateOutlet"] }, null), i0.ɵpod(8, { $implicit: 0, selectedOption: 1 }), (_l()(), i0.ɵand(0, null, null, 0))], function (_ck, _v) { var _co = _v.component; var currVal_0 = !_co.groupTemplate; _ck(_v, 2, 0, currVal_0); var currVal_1 = _ck(_v, 5, 0, _v.context.$implicit); var currVal_2 = _co.groupTemplate; _ck(_v, 4, 0, currVal_1, currVal_2); var currVal_3 = _ck(_v, 8, 0, _v.context.$implicit.items, _co.selectedOption); var currVal_4 = i0.ɵnov(_v.parent.parent, 13); _ck(_v, 7, 0, currVal_3, currVal_4); }, null); }
function View_Dropdown_16(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 2, null, null, null, null, null, null, null)), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_Dropdown_17)), i0.ɵdid(2, 278528, null, 0, i2.NgForOf, [i0.ViewContainerRef, i0.TemplateRef, i0.IterableDiffers], { ngForOf: [0, "ngForOf"] }, null), (_l()(), i0.ɵand(0, null, null, 0))], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.optionsToDisplay; _ck(_v, 2, 0, currVal_0); }, null); }
function View_Dropdown_22(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 0, null, null, null, null, null, null, null))], null, null); }
function View_Dropdown_21(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 3, null, null, null, null, null, null, null)), (_l()(), i0.ɵand(16777216, null, null, 2, null, View_Dropdown_22)), i0.ɵdid(2, 540672, null, 0, i2.NgTemplateOutlet, [i0.ViewContainerRef], { ngTemplateOutletContext: [0, "ngTemplateOutletContext"], ngTemplateOutlet: [1, "ngTemplateOutlet"] }, null), i0.ɵpod(3, { $implicit: 0, selectedOption: 1 }), (_l()(), i0.ɵand(0, null, null, 0))], function (_ck, _v) { var _co = _v.component; var currVal_0 = _ck(_v, 3, 0, _co.optionsToDisplay, _co.selectedOption); var currVal_1 = i0.ɵnov(_v.parent, 13); _ck(_v, 2, 0, currVal_0, currVal_1); }, null); }
function View_Dropdown_25(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 1, "span", [], null, null, null, null, null)), (_l()(), i0.ɵted(1, null, ["", ""]))], null, function (_ck, _v) { var currVal_0 = (_v.parent.context.$implicit.label || "empty"); _ck(_v, 1, 0, currVal_0); }); }
function View_Dropdown_26(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 0, null, null, null, null, null, null, null))], null, null); }
function View_Dropdown_24(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 7, "li", [], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.onItemClick($event, _v.context.$implicit) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), i0.ɵdid(1, 278528, null, 0, i2.NgClass, [i0.IterableDiffers, i0.KeyValueDiffers, i0.ElementRef, i0.Renderer2], { ngClass: [0, "ngClass"] }, null), i0.ɵpod(2, { "ui-dropdown-item ui-corner-all": 0, "ui-state-highlight": 1, "ui-state-disabled": 2, "ui-dropdown-item-empty": 3 }), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_Dropdown_25)), i0.ɵdid(4, 16384, null, 0, i2.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵand(16777216, null, null, 2, null, View_Dropdown_26)), i0.ɵdid(6, 540672, null, 0, i2.NgTemplateOutlet, [i0.ViewContainerRef], { ngTemplateOutletContext: [0, "ngTemplateOutletContext"], ngTemplateOutlet: [1, "ngTemplateOutlet"] }, null), i0.ɵpod(7, { $implicit: 0 })], function (_ck, _v) { var _co = _v.component; var currVal_0 = _ck(_v, 2, 0, true, (_v.parent.context.selectedOption == _v.context.$implicit), _v.context.$implicit.disabled, (!_v.context.$implicit.label || (_v.context.$implicit.label.length === 0))); _ck(_v, 1, 0, currVal_0); var currVal_1 = !_co.itemTemplate; _ck(_v, 4, 0, currVal_1); var currVal_2 = _ck(_v, 7, 0, _v.context.$implicit); var currVal_3 = _co.itemTemplate; _ck(_v, 6, 0, currVal_2, currVal_3); }, null); }
function View_Dropdown_23(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵand(16777216, null, null, 1, null, View_Dropdown_24)), i0.ɵdid(1, 278528, null, 0, i2.NgForOf, [i0.ViewContainerRef, i0.TemplateRef, i0.IterableDiffers], { ngForOf: [0, "ngForOf"] }, null), (_l()(), i0.ɵand(0, null, null, 0))], function (_ck, _v) { var currVal_0 = _v.context.$implicit; _ck(_v, 1, 0, currVal_0); }, null); }
function View_Dropdown_27(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 1, "li", [], null, null, null, null, null)), (_l()(), i0.ɵted(1, null, ["", ""]))], null, function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.emptyFilterMessage; _ck(_v, 1, 0, currVal_0); }); }
function View_Dropdown_28(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 2, "li", [["class", "ui-dropdown-item ui-corner-all"]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.onAddNovo($event, _co.filter.value) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), i0.ɵeld(1, 0, null, null, 1, "span", [], null, null, null, null, null)), (_l()(), i0.ɵted(2, null, ["Adicionar ", ""]))], null, function (_ck, _v) { var _co = _v.component; var currVal_0 = ((_co.filter.value == "") ? "novo" : _co.filter.value); _ck(_v, 2, 0, currVal_0); }); }
function View_Dropdown_14(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, [[4, 0], ["containerPanel", 1]], null, 17, "div", [], [[24, "@overlayAnimation", 0]], [[null, "@overlayAnimation.start"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("@overlayAnimation.start" === en)) {
        var pd_0 = (_co.onOverlayAnimationStart($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), i0.ɵdid(1, 278528, null, 0, i2.NgClass, [i0.IterableDiffers, i0.KeyValueDiffers, i0.ElementRef, i0.Renderer2], { klass: [0, "klass"], ngClass: [1, "ngClass"] }, null), i0.ɵdid(2, 278528, null, 0, i2.NgStyle, [i0.KeyValueDiffers, i0.ElementRef, i0.Renderer2], { ngStyle: [0, "ngStyle"] }, null), i0.ɵpod(3, { showTransitionParams: 0, hideTransitionParams: 1 }), i0.ɵpod(4, { value: 0, params: 1 }), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_Dropdown_15)), i0.ɵdid(6, 16384, null, 0, i2.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵeld(7, 0, null, null, 10, "div", [["class", "ui-dropdown-items-wrapper"]], [[4, "max-height", null]], null, null, null, null)), (_l()(), i0.ɵeld(8, 0, null, null, 9, "ul", [["class", "ui-dropdown-items ui-dropdown-list ui-widget-content ui-widget ui-corner-all ui-helper-reset"]], null, null, null, null, null)), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_Dropdown_16)), i0.ɵdid(10, 16384, null, 0, i2.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_Dropdown_21)), i0.ɵdid(12, 16384, null, 0, i2.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵand(0, [["itemslist", 2]], null, 0, null, View_Dropdown_23)), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_Dropdown_27)), i0.ɵdid(15, 16384, null, 0, i2.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_Dropdown_28)), i0.ɵdid(17, 16384, null, 0, i2.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_1 = _co.panelStyleClass; var currVal_2 = "ui-dropdown-panel  ui-widget ui-widget-content ui-corner-all ui-shadow"; _ck(_v, 1, 0, currVal_1, currVal_2); var currVal_3 = _co.panelStyle; _ck(_v, 2, 0, currVal_3); var currVal_4 = _co.filter; _ck(_v, 6, 0, currVal_4); var currVal_6 = _co.group; _ck(_v, 10, 0, currVal_6); var currVal_7 = !_co.group; _ck(_v, 12, 0, currVal_7); var currVal_8 = ((_co.filter && _co.optionsToDisplay) && (_co.optionsToDisplay.length === 0)); _ck(_v, 15, 0, currVal_8); var currVal_9 = _co.podeAdicionar; _ck(_v, 17, 0, currVal_9); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = _ck(_v, 4, 0, "visible", _ck(_v, 3, 0, _co.showTransitionOptions, _co.hideTransitionOptions)); _ck(_v, 0, 0, currVal_0); var currVal_5 = (_co.scrollHeight || "auto"); _ck(_v, 7, 0, currVal_5); }); }
function View_Dropdown_0(_l) { return i0.ɵvid(0, [i0.ɵqud(402653184, 1, { containerViewChild: 0 }), i0.ɵqud(671088640, 2, { filterViewChild: 0 }), i0.ɵqud(402653184, 3, { focusViewChild: 0 }), i0.ɵqud(671088640, 4, { containerPanel: 0 }), i0.ɵqud(671088640, 5, { editableInputViewChild: 0 }), (_l()(), i0.ɵeld(5, 0, [[1, 0], ["container", 1]], null, 20, "div", [], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.onMouseclick($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), i0.ɵdid(6, 278528, null, 0, i2.NgClass, [i0.IterableDiffers, i0.KeyValueDiffers, i0.ElementRef, i0.Renderer2], { klass: [0, "klass"], ngClass: [1, "ngClass"] }, null), i0.ɵpod(7, { "ui-dropdown ui-widget ui-state-default ui-corner-all ui-helper-clearfix": 0, "ui-state-disabled": 1, "ui-dropdown-open": 2, "ui-state-focus": 3, "ui-dropdown-clearable": 4 }), i0.ɵdid(8, 278528, null, 0, i2.NgStyle, [i0.KeyValueDiffers, i0.ElementRef, i0.Renderer2], { ngStyle: [0, "ngStyle"] }, null), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_Dropdown_1)), i0.ɵdid(10, 16384, null, 0, i2.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵeld(11, 0, null, null, 1, "div", [["class", "ui-helper-hidden-accessible"]], null, null, null, null, null)), (_l()(), i0.ɵeld(12, 0, [[3, 0], ["in", 1]], null, 0, "input", [["readonly", ""], ["role", "listbox"], ["type", "text"]], [[1, "id", 0], [1, "aria-label", 0], [8, "disabled", 0], [1, "tabindex", 0], [1, "autofocus", 0]], [[null, "focus"], [null, "blur"], [null, "keydown"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("focus" === en)) {
        var pd_0 = (_co.onInputFocus($event) !== false);
        ad = (pd_0 && ad);
    } if (("blur" === en)) {
        var pd_1 = (_co.onInputBlur($event) !== false);
        ad = (pd_1 && ad);
    } if (("keydown" === en)) {
        var pd_2 = (_co.onKeydown($event, true) !== false);
        ad = (pd_2 && ad);
    } return ad; }, null, null)), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_Dropdown_8)), i0.ɵdid(14, 16384, null, 0, i2.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_Dropdown_11)), i0.ɵdid(16, 16384, null, 0, i2.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_Dropdown_12)), i0.ɵdid(18, 16384, null, 0, i2.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_Dropdown_13)), i0.ɵdid(20, 16384, null, 0, i2.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵeld(21, 0, null, null, 2, "div", [["class", "ui-dropdown-trigger ui-state-default ui-corner-right"]], null, null, null, null, null)), (_l()(), i0.ɵeld(22, 0, null, null, 1, "span", [["class", "ui-dropdown-trigger-icon ui-clickable"]], null, null, null, null, null)), i0.ɵdid(23, 278528, null, 0, i2.NgClass, [i0.IterableDiffers, i0.KeyValueDiffers, i0.ElementRef, i0.Renderer2], { klass: [0, "klass"], ngClass: [1, "ngClass"] }, null), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_Dropdown_14)), i0.ɵdid(25, 16384, null, 0, i2.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null)], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.styleClass; var currVal_1 = _ck(_v, 7, 0, true, _co.disabled, _co.overlayVisible, _co.focused, (_co.showClear && !_co.disabled)); _ck(_v, 6, 0, currVal_0, currVal_1); var currVal_2 = _co.style; _ck(_v, 8, 0, currVal_2); var currVal_3 = _co.autoWidth; _ck(_v, 10, 0, currVal_3); var currVal_9 = (!_co.editable && (_co.label != null)); _ck(_v, 14, 0, currVal_9); var currVal_10 = (!_co.editable && (_co.label == null)); _ck(_v, 16, 0, currVal_10); var currVal_11 = _co.editable; _ck(_v, 18, 0, currVal_11); var currVal_12 = (((_co.value != null) && _co.showClear) && !_co.disabled); _ck(_v, 20, 0, currVal_12); var currVal_13 = "ui-dropdown-trigger-icon ui-clickable"; var currVal_14 = _co.dropdownIcon; _ck(_v, 23, 0, currVal_13, currVal_14); var currVal_15 = _co.overlayVisible; _ck(_v, 25, 0, currVal_15); }, function (_ck, _v) { var _co = _v.component; var currVal_4 = _co.inputId; var currVal_5 = (_co.selectedOption ? _co.selectedOption.label : " "); var currVal_6 = _co.disabled; var currVal_7 = _co.tabindex; var currVal_8 = _co.autofocus; _ck(_v, 12, 0, currVal_4, currVal_5, currVal_6, currVal_7, currVal_8); }); }
exports.View_Dropdown_0 = View_Dropdown_0;
function View_Dropdown_Host_0(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 5, "p-dropdown", [], [[2, "ui-inputwrapper-filled", null], [2, "ui-inputwrapper-focus", null]], null, null, View_Dropdown_0, RenderType_Dropdown)), i0.ɵprd(5120, null, i4.NG_VALUE_ACCESSOR, function (p0_0) { return [p0_0]; }, [i1.Dropdown]), i0.ɵprd(512, null, i5.DomHandler, i5.DomHandler, []), i0.ɵprd(512, null, i6.ObjectUtils, i6.ObjectUtils, []), i0.ɵdid(4, 13877248, null, 1, i1.Dropdown, [i0.ElementRef, i5.DomHandler, i0.Renderer2, i0.ChangeDetectorRef, i6.ObjectUtils, i0.NgZone], null, null), i0.ɵqud(603979776, 1, { templates: 1 })], function (_ck, _v) { _ck(_v, 4, 0); }, function (_ck, _v) { var currVal_0 = i0.ɵnov(_v, 4).filled; var currVal_1 = i0.ɵnov(_v, 4).focused; _ck(_v, 0, 0, currVal_0, currVal_1); }); }
exports.View_Dropdown_Host_0 = View_Dropdown_Host_0;
var DropdownNgFactory = i0.ɵccf("p-dropdown", i1.Dropdown, View_Dropdown_Host_0, { scrollHeight: "scrollHeight", filter: "filter", name: "name", style: "style", panelStyle: "panelStyle", styleClass: "styleClass", panelStyleClass: "panelStyleClass", disabled: "disabled", readonly: "readonly", autoWidth: "autoWidth", required: "required", editable: "editable", podeAdicionar: "podeAdicionar", appendTo: "appendTo", tabindex: "tabindex", placeholder: "placeholder", filterPlaceholder: "filterPlaceholder", inputId: "inputId", selectId: "selectId", multiplicador: "multiplicador", dataKey: "dataKey", filterBy: "filterBy", autofocus: "autofocus", resetFilterOnHide: "resetFilterOnHide", dropdownIcon: "dropdownIcon", optionLabel: "optionLabel", autoDisplayFirst: "autoDisplayFirst", group: "group", showClear: "showClear", emptyFilterMessage: "emptyFilterMessage", autoZIndex: "autoZIndex", baseZIndex: "baseZIndex", showTransitionOptions: "showTransitionOptions", hideTransitionOptions: "hideTransitionOptions", options: "options" }, { onChange: "onChange", onFocus: "onFocus", onBlur: "onBlur", onClick: "onClick", onShow: "onShow", onHide: "onHide", onKey: "onKey", onAdd: "onAdd" }, []);
exports.DropdownNgFactory = DropdownNgFactory;
//# sourceMappingURL=dropdown.ngfactory.js.map