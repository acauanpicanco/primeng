import {NgModule,Component,ElementRef,OnInit,AfterViewInit,AfterContentInit,AfterViewChecked,OnDestroy,Input,Output,Renderer2,EventEmitter,ContentChildren,
        QueryList,ViewChild,TemplateRef,forwardRef,ChangeDetectorRef,NgZone, HostListener} from '@angular/core';
import {trigger,state,style,transition,animate,AnimationEvent} from '@angular/animations';
import {CommonModule} from '@angular/common';
import {SelectItem} from '../common/selectitem';
import {SharedModule,PrimeTemplate} from '../common/shared';
import {DomHandler} from '../dom/domhandler';
import {ObjectUtils} from '../utils/objectutils';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';

export const DROPDOWN_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => Dropdown),
  multi: true
};

@Component({
    selector: 'p-dropdown',
    template: `
         <div #container [ngClass]="{'ui-dropdown ui-widget ui-state-default ui-corner-all ui-helper-clearfix':true,
            'ui-state-disabled':disabled, 'ui-dropdown-open':overlayVisible, 'ui-state-focus':focused, 'ui-dropdown-clearable': showClear && !disabled}"
            (click)="onMouseclick($event)" (focusin)="focusInComponent($event)" [ngStyle]="style" [class]="styleClass">
            <div class="ui-helper-hidden-accessible" *ngIf="autoWidth">
                <select [attr.id]="selectId" [required]="required" [attr.name]="name" [attr.aria-label]="selectedOption ? selectedOption.label : ' '" tabindex="-1" aria-hidden="true">
                    <option *ngIf="placeholder">{{placeholder}}</option>
                    <ng-container *ngIf="group">
                        <optgroup *ngFor="let option of options" [attr.label]="option.label">
                            <option *ngFor="let option of option.items" [value]="option.value" [selected]="selectedOption == option">{{option.label}}</option>
                        <optgroup>
                    </ng-container>
                    <ng-container *ngIf="!group">
                        <option *ngFor="let option of options" [value]="option.value" [selected]="selectedOption == option">{{option.label}}</option>
                    </ng-container>
                </select>
            </div>
            <div class="ui-helper-hidden-accessible">
                <input #in [attr.id]="inputId" type="text" [attr.aria-label]="selectedOption ? selectedOption.label : ' '" readonly (focus)="onInputFocus($event)" role="listbox"
                    (blur)="onInputBlur($event)" (keydown)="onKeydown($event, true)" [disabled]="disabled" [attr.tabindex]="tabindex" [attr.autofocus]="autofocus">
            </div>
            <label [ngClass]="{'ui-dropdown-label ui-inputtext ui-corner-all':true,'ui-dropdown-label-empty':(label == null || label.length === 0)}" *ngIf="!editable && (label != null)">
                <ng-container *ngIf="!selectedItemTemplate">{{label||'empty'}}</ng-container>
                <ng-container *ngTemplateOutlet="selectedItemTemplate; context: {$implicit: selectedOption}"></ng-container>
            </label>
            <label [ngClass]="{'ui-dropdown-label ui-inputtext ui-corner-all ui-placeholder':true,'ui-dropdown-label-empty': (placeholder == null || placeholder.length === 0)}" *ngIf="!editable && (label == null)">{{placeholder||'empty'}}</label>
            <input #editableInput type="text" [attr.aria-label]="selectedOption ? selectedOption.label : ' '" class="ui-dropdown-label ui-inputtext ui-corner-all" *ngIf="editable" [disabled]="disabled" [attr.placeholder]="placeholder"
                        (click)="onEditableInputClick($event)" (input)="onEditableInputChange($event)" (focus)="onEditableInputFocus($event)" (blur)="onInputBlur($event)">
            <i class="ui-dropdown-clear-icon pi pi-times" (click)="clear($event)" *ngIf="value != null && showClear && !disabled"></i>
            <div class="ui-dropdown-trigger ui-state-default ui-corner-right">
                <span class="ui-dropdown-trigger-icon ui-clickable" [ngClass]="dropdownIcon"></span>
            </div>
            <div #containerPanel *ngIf="overlayVisible" [ngClass]="'ui-dropdown-panel  ui-widget ui-widget-content ui-corner-all ui-shadow'" [@overlayAnimation]="{value: 'visible', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}" (@overlayAnimation.start)="onOverlayAnimationStart($event)" [ngStyle]="panelStyle" [class]="panelStyleClass">
                <div *ngIf="filter" class="ui-dropdown-filter-container" (input)="onFilter($event)" (click)="$event.stopPropagation()">
                    <input #filter type="text" autocomplete="off" [value]="filterValue||''" class="ui-dropdown-filter ui-inputtext ui-widget ui-state-default ui-corner-all" [attr.placeholder]="filterPlaceholder"
                    (keyup.enter)="onEnterKey($event)" (input)="dropDownFilter($event.target.value);" (keydown)="onKeydown($event, false)">
                    <span class="ui-dropdown-filter-icon pi" [ngClass]="{'pi-search': !loading, 'pi-spinner pi-spin': loading}"></span>
                </div>
                <div class="ui-dropdown-items-wrapper" [style.max-height]="scrollHeight||'auto'">
                    <ul class="ui-dropdown-items ui-dropdown-list ui-widget-content ui-widget ui-corner-all ui-helper-reset">
                        <ng-container *ngIf="group">
                            <ng-template ngFor let-optgroup [ngForOf]="optionsToDisplay">
                                <li class="ui-dropdown-item-group">
                                    <span *ngIf="!groupTemplate">{{optgroup.label||'empty'}}</span>
                                    <ng-container *ngTemplateOutlet="groupTemplate; context: {$implicit: optgroup}"></ng-container>
                                </li>
                                <ng-container *ngTemplateOutlet="itemslist; context: {$implicit: optgroup.items, selectedOption: selectedOption}"></ng-container>
                            </ng-template>
                        </ng-container>
                        <ng-container *ngIf="!group">
                            <ng-container *ngTemplateOutlet="itemslist; context: {$implicit: optionsToDisplay, selectedOption: selectedOption}"></ng-container>
                        </ng-container>
                        <ng-template #itemslist let-options let-selectedOption="selectedOption">
                            <li *ngFor="let option of options;let i=index" (click)="onItemClick($event, option)"
                                    [ngClass]="{'ui-dropdown-item ui-corner-all':true,
                                                'ui-state-highlight':(selectedIndex == i),
                                                'ui-state-disabled':(option.disabled),
                                                'ui-dropdown-item-empty':!option.label||option.label.length === 0}">
                                <span *ngIf="!itemTemplate">{{option.label||'empty'}}</span>
                                <ng-container *ngTemplateOutlet="itemTemplate; context: {$implicit: option}"></ng-container>
                            </li>
                        </ng-template>
                        <li style="padding: 10px;" *ngIf="filter && optionsToDisplay && optionsToDisplay.length === 0">{{emptyFilterMessage}}</li>
						
                    </ul>
                </div>
            </div>
        </div>
    `,
    animations: [
        trigger('overlayAnimation', [
            state('void', style({
                transform: 'translateY(5%)',
                opacity: 0
            })),
            state('visible', style({
                transform: 'translateY(0)',
                opacity: 1
            })),
            transition('void => visible', animate('{{showTransitionParams}}')),
            transition('visible => void', animate('{{hideTransitionParams}}'))
        ])
    ],
    host: {
        '[class.ui-inputwrapper-filled]': 'filled',
        '[class.ui-inputwrapper-focus]': 'focused'
    },
    providers: [DomHandler,ObjectUtils,DROPDOWN_VALUE_ACCESSOR]
})
export class Dropdown implements OnInit,AfterViewInit,AfterContentInit,AfterViewChecked,OnDestroy,ControlValueAccessor {

    @Input() scrollHeight: string = '200px';

    @Input() filter: boolean;

    @Input() name: string;

    @Input() style: any;
    
    @Input() panelStyle: any;

    @Input() styleClass: string;
    
    @Input() panelStyleClass: string;
    
    @Input() disabled: boolean;
    
    @Input() readonly: boolean;
    
    @Input() autoWidth: boolean = true;
    
    @Input() required: boolean;
    
    @Input() editable: boolean;
	
	@Input() podeAdicionar: boolean = false;
    
    @Input() appendTo: any;

    @Input() tabindex: number;
    
    @Input() placeholder: string;
    
    @Input() filterPlaceholder: string;

    @Input() inputId: string;

    @Input() selectId: string;
	
	@Input() multiplicador: number = 1;
    
    @Input() dataKey: string;

    @Input() loading: boolean = false;
    
    @Input() filterBy: string = 'label';
    
    @Input() autofocus: boolean;
    
    @Input() resetFilterOnHide: boolean = false;
    
    @Input() dropdownIcon: string = 'pi pi-caret-down';
    
    @Input() optionLabel: string;

    @Input() autoDisplayFirst: boolean = true;

    @Input() group: boolean;

    @Input() showClear: boolean;

    @Input() emptyFilterMessage: string = 'Nenhum resultado encontrado.';

    @Input() autoZIndex: boolean = true;
    
    @Input() baseZIndex: number = 0;

    @Input() showTransitionOptions: string = '225ms ease-out';

    @Input() hideTransitionOptions: string = '195ms ease-in';
    
    @Output() onChange: EventEmitter<any> = new EventEmitter();
    
    @Output() onFocus: EventEmitter<any> = new EventEmitter();
    
    @Output() onBlur: EventEmitter<any> = new EventEmitter();

    @Output() onClick: EventEmitter<any> = new EventEmitter();

    @Output() onShow: EventEmitter<any> = new EventEmitter();

    @Output() onHide: EventEmitter<any> = new EventEmitter();

    @Output() onKey: EventEmitter<any> = new EventEmitter();

    @Output() buscouEnter: EventEmitter<any> = new EventEmitter();
	
    @Output() onAdd: EventEmitter<any> = new EventEmitter();
    
    @Output() onClear: EventEmitter<any> = new EventEmitter();
    
    @ViewChild('container') containerViewChild: ElementRef;
    
    @ViewChild('filter') filterViewChild: ElementRef;
    
    @ViewChild('in') focusViewChild: ElementRef;
	
	@ViewChild('containerPanel') containerPanel: ElementRef;
    
    @ViewChild('editableInput') editableInputViewChild: ElementRef;
    
    @ContentChildren(PrimeTemplate) templates: QueryList<any>;

    overlay: HTMLDivElement;

    itemsWrapper: HTMLDivElement;
    
    itemTemplate: TemplateRef<any>;

    groupTemplate: TemplateRef<any>;

    selectedItemTemplate: TemplateRef<any>;
    
    selectedOption: any;

    selectedIndex: number = 0;
    
    _options: any[];
    
    value: any;

    focandoComMouse = false;
    
    onModelChange: Function = () => {};
    
    onModelTouched: Function = () => {};

    optionsToDisplay: any[];
    
    hover: boolean;
    
    focused: boolean;

    filled: boolean;
    
    overlayVisible: boolean;
    
    documentClickListener: any;
    
    optionsChanged: boolean;
    
    panel: HTMLDivElement;
    
    dimensionsUpdated: boolean;
    
    selfClick: boolean;
    
    itemClick: boolean;

    clearClick: boolean;
    
    hoveredItem: any;
    
    selectedOptionUpdated: boolean;
    
    filterValue: string;

    searchValue: string;

    searchIndex: number;
    
    searchTimeout: any;

    previousSearchChar: string;

    currentSearchChar: string;

    documentResizeListener: any;

    /*@HostListener('keydown', ['$event']) onKeyPress(event) {
        if (event.key == "\\" && event.key == '"') {
            event.preventDefault();
        }
    }

    @HostListener('paste', ['$event']) blockPaste(event: KeyboardEvent) {
        this.validateFields(event);
    }
    */
    constructor(public el: ElementRef, public domHandler: DomHandler, public renderer: Renderer2, private cd: ChangeDetectorRef,
                public objectUtils: ObjectUtils, public zone: NgZone) {}
    
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch(item.getType()) {
                case 'item':
                    this.itemTemplate = item.template;
                break;

                case 'selectedItem':
                    this.selectedItemTemplate = item.template;
                break;

                case 'group':
                    this.groupTemplate = item.template;
                break;
                
                default:
                    this.itemTemplate = item.template;
                break;
            }
        });
    }
    
    ngOnInit() {
        this.optionsToDisplay = this.options;
        this.updateSelectedOption(null);
    }
    
    @Input() get options(): any[] {
        return this._options;
    }

    set options(val: any[]) {
        let opts = this.optionLabel ? this.objectUtils.generateSelectItems(val, this.optionLabel) : val;
        this._options = opts;
        this.optionsToDisplay = this._options;
        this.includeAddToOptionsToDisplay();
        this.updateSelectedOption(this.value);
        this.optionsChanged = true;		
		        
        if (this.filterValue && this.filterValue.length) {
            this.activateFilter();
        }
    }
    
    ngAfterViewInit() {
        if (this.options == null){
            this.options = [];
        }
        if (this.editable) {
            this.updateEditableLabel();
        }
        
        this.updateDimensions();
    }
    
    get label(): string {
        return (this.selectedOption ? this.selectedOption.label : null);
    }

    validateFields(event) {
        setTimeout(() => {
            this.el.nativeElement.value = this.el.nativeElement.value.replace("\\", "").replace('"', '');
            event.preventDefault();
        }, 100);
    }
    
    updateEditableLabel(): void {
        if (this.editableInputViewChild && this.editableInputViewChild.nativeElement) {
            this.editableInputViewChild.nativeElement.value = (this.selectedOption ? this.selectedOption.label : this.value||'');
        }
    }

    willShowOption(option): boolean {
        if (this.podeAdicionar) {
            if (option.value && option.value.isAdd){
                if (this.valueTypedIsPresent()){
                    return false;
                } 
            } 
        }
        return true;
    }

    valueTypedIsPresent():boolean {
        if (this.optionsToDisplay && this.optionsToDisplay.length > 0) {
            for (let i = 0; i < this.optionsToDisplay.length; i++) {
                if (this.optionsToDisplay[i] && this.optionsToDisplay[i].value[this.optionLabel] && this.filterValue) { 
                    if (this.optionsToDisplay[i].value[this.optionLabel].toLowerCase() == this.filterValue.toLowerCase()) {
                        return true;
                    }            
                }
            }
        }
        return false;
    }
    
    onItemClick(event, option) {
        this.itemClick = true;
        
        if (!option.disabled) {
            this.selectItem(event, option);
            this.focusViewChild.nativeElement.focus();
            this.filled = true;
        }

        setTimeout(() => {
            this.hide();
        }, 150);
    }
	
	getFilterValue():string {
		if (this.filter && this.filterViewChild && this.filterViewChild.nativeElement){			
			return this.filterViewChild.nativeElement.value;
		} else {
			return "";
		}
	}
	
	getAddLabel():string {
		return this.getFilterValue() == "" ? "novo" : this.getFilterValue();
	}
	
	onAddNovo(event) {		
		this.onAdd.emit(this.getFilterValue());
		
		setTimeout(() => {
            this.hide();
        }, 150);		
	}
    
    selectItem(event, option) {
        if (option && option.value && option.value.isAdd){
            if (this.filterViewChild.nativeElement.value.trim() != "") {
                this.onAddNovo(event);
                return;
            } else {
                this.resetFilter();
                return;
            }                     
        }
        if (this.selectedOption != option) {
            this.selectedOption = option;
            this.value = option.value;
            
            this.onModelChange(this.value);
            this.updateEditableLabel();
            this.onChange.emit({
                originalEvent: event,
                value: this.value
            });
        }
    }
    
    ngAfterViewChecked() {
        if (this.autoWidth && !this.dimensionsUpdated) {
            this.updateDimensions();
        }
        
        if (this.optionsChanged && this.overlayVisible) {
            this.optionsChanged = false;
            
            this.zone.runOutsideAngular(() => {
                setTimeout(() => {
                    this.updateDimensions();
                    this.alignOverlay();
                }, 1);
            });
        }
        
        if (this.selectedOptionUpdated && this.itemsWrapper) {
            this.updateDimensions();
            let selectedItem = this.domHandler.findSingle(this.overlay, 'li.ui-state-highlight');
            if (selectedItem) {
                this.domHandler.scrollInView(this.itemsWrapper, this.domHandler.findSingle(this.overlay, 'li.ui-state-highlight'));
            }
            this.selectedOptionUpdated = false;
        }
    }
    
    writeValue(value: any): void {
        if (this.filter) {
            setTimeout(() => {
                this.resetFilter();    
            }, 50);            
        }
        
        this.value = value;
        this.updateSelectedOption(value);
        this.updateEditableLabel();
        this.updateFilledState();
        this.cd.markForCheck();
    }
    
    resetFilter(): void {
        if (this.filterViewChild && this.filterViewChild.nativeElement) {
            this.filterValue = null;
            this.filterViewChild.nativeElement.value = '';
        }
        
        this.optionsToDisplay = this.options;
        this.includeAddToOptionsToDisplay();
    }

    includeAddToOptionsToDisplay(){
        if (this.optionsToDisplay && this.optionsToDisplay.length > 0){
            this.optionsToDisplay = this.optionsToDisplay.filter(option => option.value && !option.value.isAdd);
        }
        if (this.podeAdicionar && !this.valueTypedIsPresent()){
            var addItem = {label: 'Adicionar novo', value: {isAdd: true, id: -3}};
            if (this.getFilterValue() == ""){
                addItem.value[this.optionLabel] = `<span class="adicionar-novo-dropdown"><i class="fa fa-plus"></i>&nbsp; Adicionar novo</span>`;
            } else {
                addItem.value[this.optionLabel] = `<span class="adicionar-novo-dropdown"><i class="fa fa-plus"></i>&nbsp; Adicionar '${this.getFilterValue()}'</span>`;
            }
            if (!this.optionsToDisplay){
                this.optionsToDisplay = [];
            }
            this.optionsToDisplay.push(addItem);            
        }
    }
    
    updateSelectedOption(val: any): void {
        this.selectedOption = this.findOption(val, this.optionsToDisplay);
        if (this.autoDisplayFirst && !this.placeholder && !this.selectedOption && this.optionsToDisplay && this.optionsToDisplay.length && !this.editable) {
            this.selectedOption = this.optionsToDisplay[0];
        }
        if (this.selectedOption == null && val && val[this.optionLabel]){
            let newSelectedOption = {};
            newSelectedOption['label'] = val[this.optionLabel];
            newSelectedOption['value'] = val;
            this.selectedOption = newSelectedOption;
        }
        this.selectedOptionUpdated = true;
    }
    
    registerOnChange(fn: Function): void {
        this.onModelChange = fn;
    }

    registerOnTouched(fn: Function): void {
        this.onModelTouched = fn;
    }
    
    setDisabledState(val: boolean): void {
        this.disabled = val;
    }
    
    updateDimensions() {
        if (this.autoWidth && this.el.nativeElement && this.el.nativeElement.children[0] && this.el.nativeElement.offsetParent) {
            let select = this.domHandler.findSingle(this.el.nativeElement, 'select');
            if (select && !this.style||(this.style && (!this.style['width']&&!this.style['min-width']))) {
                this.el.nativeElement.children[0].style.width = select.offsetWidth + 30 + 'px';
            }
            this.dimensionsUpdated = true;
        }
    }

    focusInComponent(event){
        if (!this.focandoComMouse && !this.overlayVisible){
            this.show();
            setTimeout(() => {
                if (this.filterViewChild != undefined) {
                    this.filterViewChild.nativeElement.focus();
                }
            }, 20);
        }
    }
    
    onMouseclick(event) {
        this.focandoComMouse = true;
        if (this.disabled||this.readonly) {
            return;
        }

        this.onClick.emit(event);
        
        this.selfClick = true;
        this.clearClick = this.domHandler.hasClass(event.target, 'ui-dropdown-clear-icon');
        
        if (!this.itemClick && !this.clearClick) {
            this.focusViewChild.nativeElement.focus();
            
            if (this.overlayVisible) {
                this.hide();
                this.focandoComMouse = false;
            }
            else {
                this.show();

                setTimeout(() => {
                    if (this.filterViewChild != undefined) {
                        this.filterViewChild.nativeElement.focus();
                    }
                    this.focandoComMouse = false;
                }, 200);
            }
        } else {
            this.focandoComMouse = false;
        }
        
    }
    
    onEditableInputClick(event) {
        this.itemClick = true;
        this.bindDocumentClickListener();
    }
    
    onEditableInputFocus(event) {
        this.focused = true;
        this.hide();
        this.onFocus.emit(event);
    }
    
    onEditableInputChange(event) {
        this.value = event.target.value;
        this.updateSelectedOption(this.value);
        this.onModelChange(this.value);
        this.onChange.emit({
            originalEvent: event,
            value: this.value
        });
    }
    
    show() {
        this.overlayVisible = true;
        let ddRect: ClientRect = this.el.nativeElement.getBoundingClientRect();		
        
        setTimeout(() => {
            if (this.containerPanel && this.multiplicador != 1){
                let maxSize = window.innerWidth - 50;
                let calculatedSize = (ddRect.width * this.multiplicador) -2;
                this.containerPanel.nativeElement.style.width = (calculatedSize > maxSize ? maxSize : calculatedSize) + 'px';
                this.containerPanel.nativeElement.style.minWidth = (calculatedSize > maxSize ? maxSize : calculatedSize) + 'px';
            }
        }, 50);		
        
    }

    onOverlayAnimationStart(event: AnimationEvent) {
        switch (event.toState) {
            case 'visible':
                this.overlay = event.element;
                this.itemsWrapper = this.domHandler.findSingle(this.overlay, '.ui-dropdown-items-wrapper');
                this.appendOverlay();
                if (this.autoZIndex) {
                    this.overlay.style.zIndex = String(this.baseZIndex + (++DomHandler.zindex));
                }
                this.alignOverlay();
                this.bindDocumentClickListener();
                this.bindDocumentResizeListener();

                if (this.options && this.options.length) {
                    let selectedListItem = this.domHandler.findSingle(this.itemsWrapper, '.ui-dropdown-item.ui-state-highlight');
                    if (selectedListItem) {
                        this.domHandler.scrollInView(this.itemsWrapper, selectedListItem);
                    }
                }

                this.onShow.emit(event);
            break;

            case 'void':
                this.onHide.emit(event);
                this.onOverlayHide();
            break;
        }
    }

    appendOverlay() {
        if (this.appendTo) {
            if (this.appendTo === 'body')
                document.body.appendChild(this.overlay);
            else
                this.domHandler.appendChild(this.overlay, this.appendTo);

            this.overlay.style.minWidth = this.domHandler.getWidth(this.containerViewChild.nativeElement) + 'px';
        }
    }

    restoreOverlayAppend() {
        if (this.overlay && this.appendTo) {
            this.el.nativeElement.appendChild(this.overlay);
        }
    }
	
	dropDownFilter(event){
		this.onKey.emit(event);
	}
    
    hide() {
        this.overlayVisible = false;
        
        if (this.filter && this.resetFilterOnHide) {
            this.resetFilter();
        }

        this.cd.markForCheck();
    }
    
    alignOverlay() {
        if (this.overlay) {
            if (this.appendTo)
                this.domHandler.absolutePosition(this.overlay, this.containerViewChild.nativeElement);
            else
                this.domHandler.relativePosition(this.overlay, this.containerViewChild.nativeElement);
        }        
    }
    
    onInputFocus(event) {
        this.focused = true;
        this.onFocus.emit(event);
    }
    
    onInputBlur(event) {
        this.focused = false;
        this.onModelTouched();
        this.onBlur.emit(event);
    }

    findPrevEnabledOption(index) {
        let prevEnabledOption;

        if (this.optionsToDisplay && this.optionsToDisplay.length) {
            for (let i = (index - 1); 0 <= i; i--) {
                let option = this.optionsToDisplay[i];
                if (option.disabled) {
                    continue;
                }
                else {
                    prevEnabledOption = option;
                    break;
                }
            }

            if (!prevEnabledOption) {
                for (let i = this.optionsToDisplay.length - 1; i >= index ; i--) {
                    let option = this.optionsToDisplay[i];
                    if (option.disabled) {
                        continue;
                    }
                    else {
                        prevEnabledOption = option;
                        break;
                    }
                }
            }
        }

        return prevEnabledOption;
    }

    findNextEnabledOption(index) {
        let nextEnabledOption;

        if (this.optionsToDisplay && this.optionsToDisplay.length) {
            for (let i = (index + 1); index < (this.optionsToDisplay.length - 1); i++) {
                let option = this.optionsToDisplay[i];
                if (option.disabled) {
                    continue;
                }
                else {
                    nextEnabledOption = option;
                    break;
                }
            }

            if (!nextEnabledOption) {
                for (let i = 0; i < index; i++) {
                    let option = this.optionsToDisplay[i];
                    if (option.disabled) {
                        continue;
                    }
                    else {
                        nextEnabledOption = option;
                        break;
                    }
                }
            }
        }

        return nextEnabledOption;
    }
    
    onKeydown(event: KeyboardEvent, search: boolean) {
        if (this.readonly || !this.optionsToDisplay || this.optionsToDisplay.length === null) {
            return;
        }
        if (event.key == "\\" || event.key == '"') {
            event.preventDefault();
        }

        switch(event.which) {
            //down
            case 40:
                if (!this.overlayVisible && event.altKey) {
                    this.show();
                }
                else {
                    if (this.group) {
                        let selectedItemIndex = this.selectedOption ? this.findOptionGroupIndex(this.selectedOption.value, this.optionsToDisplay) : -1;
                        
                        if (selectedItemIndex !== -1) {
                            let nextItemIndex = selectedItemIndex.itemIndex + 1;
                            if (nextItemIndex < (this.optionsToDisplay[selectedItemIndex.groupIndex].items.length)) {
                                this.selectItem(event, this.optionsToDisplay[selectedItemIndex.groupIndex].items[nextItemIndex]);
                                this.selectedOptionUpdated = true;
                            }
                            else if (this.optionsToDisplay[selectedItemIndex.groupIndex + 1]) {
                                this.selectItem(event, this.optionsToDisplay[selectedItemIndex.groupIndex + 1].items[0]);
                                this.selectedOptionUpdated = true;
                            }
                        }
                        else {
                            this.selectItem(event, this.optionsToDisplay[0].items[0]);
                        }
                    }
                    else {
                        let selectedItemIndex = this.selectedOption ? this.findOptionIndex(this.selectedOption.value, this.optionsToDisplay) : -1;
                        this.selectedIndex++;
                        if (this.selectedIndex >= this.optionsToDisplay.length) this.selectedIndex = 0;
                        let nextEnabledOption = this.findNextEnabledOption(selectedItemIndex);
                        if (nextEnabledOption) {
                            //this.selectItem(event, nextEnabledOption);
                            this.selectedOptionUpdated = true;
                        }
                    }
                }
                
                event.preventDefault();
                
            break;
            
            //up
            case 38:
                if (this.group) {
                    let selectedItemIndex = this.selectedOption ? this.findOptionGroupIndex(this.selectedOption.value, this.optionsToDisplay) : -1;
                    if (selectedItemIndex !== -1) {
                        let prevItemIndex = selectedItemIndex.itemIndex - 1;
                        if (prevItemIndex >= 0) {
                            this.selectItem(event, this.optionsToDisplay[selectedItemIndex.groupIndex].items[prevItemIndex]);
                            this.selectedOptionUpdated = true;
                        }
                        else if (prevItemIndex < 0) {
                            let prevGroup = this.optionsToDisplay[selectedItemIndex.groupIndex - 1];
                            if (prevGroup) {
                                this.selectItem(event, prevGroup.items[prevGroup.items.length - 1]);
                                this.selectedOptionUpdated = true;
                            }
                        }
                    }
                }
                else {
                    let selectedItemIndex = this.selectedOption ? this.findOptionIndex(this.selectedOption.value, this.optionsToDisplay) : -1;
                    this.selectedIndex--;
                    if (this.selectedIndex < 0) this.selectedIndex = this.optionsToDisplay.length-1;
                    let prevEnabledOption = this.findPrevEnabledOption(selectedItemIndex);
                    if (prevEnabledOption) {
                        //this.selectItem(event, prevEnabledOption);
                        this.selectedOptionUpdated = true;
                    }
                }

                event.preventDefault();
            break;

            //space
            case 32:
            case 32:
                if (!this.overlayVisible){
                    this.show();
                    event.preventDefault();
                }
            break;
            
            //enter
            case 13:
                if (this.optionsToDisplay[this.selectedIndex]){
                    if (this.optionsToDisplay[this.selectedIndex].value && this.optionsToDisplay[this.selectedIndex].value.isAdd){
                        if (this.filterViewChild.nativeElement.value.trim() != "") {
                            this.onAddNovo(event);
                        } else {
                            this.resetFilter();
                        }                        
                    } else {
                        this.selectItem(event, this.optionsToDisplay[this.selectedIndex]);
                        this.selectedOptionUpdated = true;
                    }
                }                
                if (!this.filter || (this.optionsToDisplay && this.optionsToDisplay.length > 0)) {
                    this.hide();
                }                           
                event.preventDefault();
            break;
            
            //escape and tab
            case 27:
            case 9:
                this.hide();
            break;

            //search item based on keyboard input
            default:
                if (search) {                    
                    this.search(event);
                }
            break;
        }
    }

    onEnterKey($event) {
        if (this.filterValue){
            this.buscouEnter.emit(this.filterValue);
            this.hide();
        }  
    }

    search(event) {
        if (this.searchTimeout) {
            clearTimeout(this.searchTimeout);
        }

        const char = String.fromCharCode(event.keyCode);
        this.previousSearchChar = this.currentSearchChar;
        this.currentSearchChar = char;

        if (this.previousSearchChar === this.currentSearchChar) 
            this.searchValue = this.currentSearchChar;
        else
            this.searchValue = this.searchValue ? this.searchValue + char : char;

        let newOption;
        if (this.group) {
            let searchIndex = this.selectedOption ? this.findOptionGroupIndex(this.selectedOption.value, this.optionsToDisplay) : {groupIndex: 0, itemIndex: 0};
            newOption = this.searchOptionWithinGroup(searchIndex);
        }
        else {
            let searchIndex = this.selectedOption ? this.findOptionIndex(this.selectedOption.value, this.optionsToDisplay) : -1;
            newOption = this.searchOption(++searchIndex);
        }
        
        if (newOption) {
            this.selectItem(event, newOption);
            this.selectedOptionUpdated = true;
        }

        this.searchTimeout = setTimeout(() => {
            this.searchValue = null;
        }, 250);
    }

    searchOption(index) {
        let option;

        if (this.searchValue) {
            option = this.searchOptionInRange(index, this.optionsToDisplay.length);

            if (!option) {
                option = this.searchOptionInRange(0, index);
            }
        }

        return option;
    }

    searchOptionInRange(start, end) {
        for (let i = start; i < end; i++) {
            let opt = this.optionsToDisplay[i];
            if (opt.label.toLowerCase().startsWith(this.searchValue.toLowerCase())) {
                return opt;
            }
        }

        return null;
    }

    searchOptionWithinGroup(index) {
        let option;

        if (this.searchValue) {
            for (let i = index.groupIndex; i < this.optionsToDisplay.length; i++) {
                for (let j = (index.groupIndex === i) ? (index.itemIndex + 1) : 0; j < this.optionsToDisplay[i].items.length; j++) {
                    let opt = this.optionsToDisplay[i].items[j];
                    if (opt.label.toLowerCase().startsWith(this.searchValue.toLowerCase())) {
                        return opt;
                    }
                }
            }

            if (!option) {
                for (let i = 0; i <= index.groupIndex; i++) {
                    for (let j = 0; j < ((index.groupIndex === i) ? index.itemIndex : this.optionsToDisplay[i].items.length); j++) {
                        let opt = this.optionsToDisplay[i].items[j];
                        if (opt.label.toLowerCase().startsWith(this.searchValue.toLowerCase())) {
                            return opt;
                        }
                    }
                }
            }
        }

        return null;
    }
   
    findOptionIndex(val: any, opts: any[]): number {
        let index: number = -1;
        if (opts) {
            for (let i = 0; i < opts.length; i++) {
                if ((val == null && opts[i].value == null) || this.objectUtils.equals(val, opts[i].value, this.dataKey)) {
                    index = i;
                    break;
                }
            }
        }
        
        return index;
    }

    findOptionGroupIndex(val: any, opts: any[]): any {
        let groupIndex, itemIndex;

        if (opts) {
            for (let i = 0; i < opts.length; i++) {
                groupIndex = i;
                itemIndex = this.findOptionIndex(val, opts[i].items);

                if (itemIndex !== -1) {
                    break;
                }
            }
        }

        if (itemIndex !== -1) {
            return {groupIndex: groupIndex, itemIndex: itemIndex};
        }
        else {
            return -1;
        }
    }
    
    findOption(val: any, opts: any[], inGroup?: boolean): SelectItem {
        if (this.group && !inGroup) {
            let opt: SelectItem;
            if (opts && opts.length) {
                for (let optgroup of opts) {
                    opt = this.findOption(val, optgroup.items, true);
                    if (opt) {
                        break;
                    }
                }
            }
            return opt;
        }
        else {
            let index: number = this.findOptionIndex(val, opts);
            return (index != -1) ? opts[index] : null;
        }
    }
    
    onFilter(event): void {
        let inputValue = event.target.value;
        if (inputValue && inputValue.length) {
            this.filterValue = inputValue;
            this.activateFilter();
        }
        else {
            this.filterValue = null;
            this.optionsToDisplay = this.options;
            this.includeAddToOptionsToDisplay();
        }
        
        this.optionsChanged = true;
    }

    filtrarManualmente(filtro) {
        this.filterValue = filtro;
        this.activateFilter();
        this.optionsChanged = true;
    }
    
    activateFilter() {
        let searchFields: string[] = this.filterBy.split(',');
        this.selectedIndex = 0;
        if (this.options && this.options.length) {
            if (this.group) {
                let filteredGroups = [];
                for (let optgroup of this.options) {
                    let filteredSubOptions = this.objectUtils.filter(optgroup.items, searchFields, this.filterValue.toLowerCase());
                    if (filteredSubOptions && filteredSubOptions.length) {
                        filteredGroups.push({
                            label: optgroup.label,
                            value: optgroup.value,
                            items: filteredSubOptions
                        });
                    }
                }

                this.optionsToDisplay = filteredGroups;
            }
            else {
                this.optionsToDisplay = this.objectUtils.filter(this.options, searchFields, this.filterValue.toLowerCase());
                this.includeAddToOptionsToDisplay();
            }

            this.optionsChanged = true;
        }
    }
    
    applyFocus(): void {
        if (this.editable)
            this.domHandler.findSingle(this.el.nativeElement, '.ui-dropdown-label.ui-inputtext').focus();
        else
            this.domHandler.findSingle(this.el.nativeElement, 'input[readonly]').focus();
    }

    focus(): void {
        this.applyFocus();
    }

    focusSearchInput(): void {
        this.applyFocus();
    }
    
    bindDocumentClickListener() {
        if (!this.documentClickListener) {
            this.documentClickListener = this.renderer.listen('document', 'click', () => {
                if (!this.selfClick && !this.itemClick) {
                    this.hide();
                    this.unbindDocumentClickListener();
                }
                
                this.clearClickState();
                this.cd.markForCheck();
            });
        }
    }

    clearClickState() {
        this.selfClick = false;
        this.itemClick = false;
    }
    
    unbindDocumentClickListener() {
        if (this.documentClickListener) {
            this.documentClickListener();
            this.documentClickListener = null;
        }
    }

    bindDocumentResizeListener() {
        this.documentResizeListener = this.onWindowResize.bind(this);
        window.addEventListener('resize', this.documentResizeListener);
    }
    
    unbindDocumentResizeListener() {
        if (this.documentResizeListener) {
            window.removeEventListener('resize', this.documentResizeListener);
            this.documentResizeListener = null;
        }
    }

    onWindowResize() {
        this.hide();
    }

    updateFilledState() {
        this.filled = (this.selectedOption != null);
    }

    clear(event: Event) {
        this.clearClick = true;
        this.value = null;
        this.onModelChange(this.value);
        this.onChange.emit({
            originalEvent: event,
            value: this.value
        });
        this.onClear.emit(event);
        this.updateSelectedOption(this.value);
        this.updateEditableLabel();
        this.updateFilledState();
    }

    onOverlayHide() {
        this.unbindDocumentClickListener();
        this.unbindDocumentResizeListener();
        this.overlay = null;
        this.itemsWrapper = null;
    }
    
    ngOnDestroy() {
        this.restoreOverlayAppend();
        this.onOverlayHide();
    }
}

@NgModule({
    imports: [CommonModule,SharedModule],
    exports: [Dropdown,SharedModule],
    declarations: [Dropdown]
})
export class DropdownModule { }
