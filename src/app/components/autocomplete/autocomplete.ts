import { NgModule, Component, ViewChild, ElementRef, AfterViewChecked, AfterContentInit, DoCheck, Input, Output, EventEmitter, ContentChildren, QueryList, TemplateRef, Renderer2, forwardRef, ChangeDetectorRef, IterableDiffers, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate, AnimationEvent } from '@angular/animations';
import { InputTextModule } from '../inputtext/inputtext';
import { ButtonModule } from '../button/button';
import { SharedModule, PrimeTemplate } from '../common/shared';
import { DomHandler } from '../dom/domhandler';
import { ObjectUtils } from '../utils/objectutils';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

export const AUTOCOMPLETE_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AutoComplete),
  multi: true
};

@Component({
  selector: 'p-autoComplete',
  template: `
        <span [ngClass]="{'ui-autocomplete ui-widget':true,'ui-autocomplete-dd':dropdown,'ui-autocomplete-multiple':multiple}" [ngStyle]="style" [class]="styleClass">
            <input *ngIf="!multiple" #in [attr.type]="type" [attr.id]="inputId" [ngStyle]="inputStyle" [class]="inputStyleClass" autocomplete="off" [attr.required]="required"
            [ngClass]="'ui-inputtext ui-widget ui-state-default ui-corner-all ui-autocomplete-input'" [value]="inputFieldValue"
            (click)="onInputClick($event)" (input)="onInput($event)" (keydown)="onKeydown($event)" (keyup)="onKeyup($event)" (focus)="onInputFocus($event)" (blur)="onInputBlur($event)" (change)="onInputChange($event)" (paste)="onInputPaste($event)"
            [attr.placeholder]="placeholder" [attr.size]="size" [attr.maxlength]="maxlength" [attr.tabindex]="tabindex" [readonly]="readonly" [disabled]="disabled" [attr.aria-label]="ariaLabel" [attr.aria-labelledby]="ariaLabelledBy" [attr.aria-required]="required"
            ><ul *ngIf="multiple" #multiContainer class="ui-autocomplete-multiple-container ui-widget ui-inputtext ui-state-default ui-corner-all" [ngClass]="{'ui-state-disabled':disabled,'ui-state-focus':focus}" (click)="multiIn.focus()">
                <li #token *ngFor="let val of value; let i = index" [style.display]="val.acao == 3 ? 'none' : 'inline-block'" class="ui-autocomplete-token ui-state-highlight ui-corner-all">
                    <span class="ui-autocomplete-token-icon pi pi-fw pi-times" (click)="removeItem(token, i)" *ngIf="!disabled"></span>
                    <span *ngIf="!selectedItemTemplate" class="ui-autocomplete-token-label">{{field ? objectUtils.resolveFieldData(val, field): val}}</span>
                    <ng-container *ngTemplateOutlet="selectedItemTemplate; context: {$implicit: val}"></ng-container>
                </li>
                <li class="ui-autocomplete-input-token" (click)="onInputClick($event)">
                    <input #multiIn [attr.type]="type" [attr.maxlength]="maxlength" [attr.id]="inputId" [disabled]="disabled" [attr.placeholder]="(value&&value.length ? null : placeholder)" [attr.tabindex]="tabindex" (input)="onInput($event)"  (click)="onInputClick($event)"
                            (keydown)="onKeydown($event)" [readonly]="readonly" (keyup)="onKeyup($event)" (focus)="onInputFocus($event)" (blur)="onInputBlur($event)" (change)="onInputChange($event)" (paste)="onInputPaste($event)" autocomplete="off" 
                            [ngStyle]="inputStyle" [class]="inputStyleClass" [attr.aria-label]="ariaLabel" [attr.aria-labelledby]="ariaLabelledBy" [attr.aria-required]="required">
                </li>
            </ul
            ><i *ngIf="loading" class="ui-autocomplete-loader pi pi-spinner pi-spin"></i><button #ddBtn type="button" pButton icon="pi pi-fw pi-caret-down" class="ui-autocomplete-dropdown" [disabled]="disabled"
                (click)="handleDropdownClick($event)" *ngIf="dropdown"></button>
            <div #panel *ngIf="overlayVisible" class="ui-autocomplete-panel ui-widget ui-widget-content ui-corner-all ui-shadow" [style.max-height]="scrollHeight"
                [@overlayAnimation]="{value: 'visible', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}" (@overlayAnimation.start)="onOverlayAnimationStart($event)" (@overlayAnimation.done)="onOverlayAnimationDone($event)">
                <ul class="ui-autocomplete-items ui-autocomplete-list ui-widget-content ui-widget ui-corner-all ui-helper-reset">
                    <li *ngFor="let option of suggestions; let idx = index" [ngClass]="{'ui-autocomplete-list-item ui-corner-all':true,'ui-state-highlight':(highlightOption==option)}"
                        (mouseenter)="highlightOption=option" (mouseleave)="highlightOption=null" (click)="selectItem(option)">
                        <span *ngIf="!itemTemplate">{{field ? objectUtils.resolveFieldData(option, field) : option}}</span>
                        <ng-container *ngTemplateOutlet="itemTemplate; context: {$implicit: option, index: idx}"></ng-container>
                    </li>
                    <li style="padding: 10px;" *ngIf="noResults && emptyMessage" class="ui-autocomplete-list-item ui-corner-all">{{emptyMessage}}</li>
                </ul>
            </div>
        </span>
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
    '[class.ui-inputwrapper-focus]': 'focus && !disabled'
  },
  providers: [DomHandler, ObjectUtils, AUTOCOMPLETE_VALUE_ACCESSOR]
})
export class AutoComplete implements AfterViewChecked, AfterContentInit, DoCheck, ControlValueAccessor {

  @Input() minLength: number = 1;

  @Input() delay: number = 300;

  @Input() style: any;

  @Input() styleClass: string;

  @Input() inputStyle: any;

  @Input() inputId: string;

  @Input() inputStyleClass: string;

  @Input() placeholder: string;

  @Input() readonly: boolean;

  @Input() disabled: boolean;

  @Input() maxlength: number = 30;

  @Input() required: boolean;

  @Input() size: number;

  @Input() multiplicador: number = 1;

  @Input() appendTo: any;

  @Input() autoHighlight: boolean;

  @Input() forceSelection: boolean;

  @Input() type: string = 'text';

  @Input() autoZIndex: boolean = true;

  @Input() baseZIndex: number = 0;

  @Input() ariaLabel: string;

  @Input() ariaLabelledBy: string;

  @Output() completeMethod: EventEmitter<any> = new EventEmitter();

  @Output() onSelect: EventEmitter<any> = new EventEmitter();

  @Output() onUnselect: EventEmitter<any> = new EventEmitter();

  @Output() onFocus: EventEmitter<any> = new EventEmitter();

  @Output() onOpen: EventEmitter<any> = new EventEmitter();

  @Output() onBlur: EventEmitter<any> = new EventEmitter();

  @Output() onDropdownClick: EventEmitter<any> = new EventEmitter();

  @Output() onClear: EventEmitter<any> = new EventEmitter();

  @Output() onKeyUp: EventEmitter<any> = new EventEmitter();

  @Output() customValue: EventEmitter<any> = new EventEmitter();

  @Output() onAdd: EventEmitter<any> = new EventEmitter();

  @Output() onAddVazio: EventEmitter<any> = new EventEmitter();

  @Output() onDuplicado: EventEmitter<any> = new EventEmitter();

  @Output() onBackspace: EventEmitter<any> = new EventEmitter();

  @Output() onChipRestaurado: EventEmitter<any> = new EventEmitter();

  @Output() valorInternoModificado: EventEmitter<any> = new EventEmitter();

  @Input() field: string;

  @Input() colunaChip: string;

  @Input() colunaOpcao: string;

  @Input() scrollHeight: string = '200px';

  @Input() dropdown: boolean;

  @Input() pseudoExcluir: boolean = false;

  @Input() excluirEmDuasEtapas: boolean = false;

  @Input() dropdownMode: string = 'blank';

  @Input() multiple: boolean;

  @Input() podeAdicionar = false;
  
  @Input() podeDuplicados = false;

  @Input() tabindex: number;

  @Input() dataKey: string;

  @Input() emptyMessage: string;

  @Input() immutable: boolean = true;

  @Input() showTransitionOptions: string = '225ms ease-out';

  @Input() hideTransitionOptions: string = '195ms ease-in';

  @ViewChild('in') inputEL: ElementRef;

  @ViewChild('multiIn') multiInputEL: ElementRef;

  @ViewChild('multiContainer') multiContainerEL: ElementRef;

  @ViewChild('ddBtn') dropdownButton: ElementRef;

  @ViewChild('panel') containerPanel: ElementRef;

  @ContentChildren(PrimeTemplate) templates: QueryList<any>;

  overlay: HTMLDivElement;

  itemTemplate: TemplateRef<any>;

  selectedItemTemplate: TemplateRef<any>;

  value: any;

  _suggestions: any[];

  onModelChange: Function = () => { };

  onModelTouched: Function = () => { };

  timeout: any;

  overlayVisible: boolean = false;

  documentClickListener: any;

  suggestionsUpdated: boolean;

  highlightOption: any;

  highlightOptionChanged: boolean;

  focus: boolean = false;

  filled: boolean;

  inputClick: boolean;

  inputKeyDown: boolean;

  noResults: boolean;

  differ: any;

  inputFieldValue: string = null;

  loading: boolean;

  /*@HostListener('keydown', ['$event']) onKeyPress(event) {
    if (event.key == "\\" && event.key == '"') {
      event.preventDefault();
    }
  }

  @HostListener('paste', ['$event']) blockPaste(event: KeyboardEvent) {
    this.validateFields(event);
  }*/

  constructor(public el: ElementRef, public domHandler: DomHandler, public renderer: Renderer2, public objectUtils: ObjectUtils, public cd: ChangeDetectorRef, public differs: IterableDiffers) {
    this.differ = differs.find([]).create(null);
  }

  @Input() get suggestions(): any[] {
    return this._suggestions;
  }

  set suggestions(val: any[]) {
    this._suggestions = val;

    this.includeAddToOptionsToDisplay();
    if (this.immutable) {
      this.handleSuggestionsChange();
    }
  }

  ngDoCheck() {
    if (!this.immutable) {
      let changes = this.differ.diff(this.suggestions);

      if (changes) {
        this.handleSuggestionsChange();
      }
    }
  }

  ngAfterViewChecked() {
    //Use timeouts as since Angular 4.2, AfterViewChecked is broken and not called after panel is updated
    if (this.suggestionsUpdated && this.overlay && this.overlay.offsetParent) {
      setTimeout(() => this.alignOverlay(), 1);
      this.suggestionsUpdated = false;
    }

    if (this.highlightOptionChanged) {
      setTimeout(() => {
        let listItem = this.domHandler.findSingle(this.overlay, 'li.ui-state-highlight');
        if (listItem) {
          this.domHandler.scrollInView(this.overlay, listItem);
        }
      }, 1);
      this.highlightOptionChanged = false;
    }
  }

  validateFields(event) {
    setTimeout(() => {
      this.el.nativeElement.value = this.el.nativeElement.value.replace("\\", "").replace('"', '');
      event.preventDefault();
    }, 100);
  }

  includeAddToOptionsToDisplay() {
    if (this._suggestions && this._suggestions.length > 0) {
      this._suggestions = this._suggestions.filter(option => !option.isAdd);
    }
    if (this.podeAdicionar && !this.valueTypedIsPresent()) {
      var addItem = { isAdd: true, id: -3 };
      if (this.getFilterValue() == "" || this.getFilterValue() == null || this.getFilterValue() == undefined) {
        addItem[this.colunaOpcao] = `<span class="adicionar-novo-dropdown"><i class="fa fa-plus"></i>&nbsp; Adicionar novo</span>`;
        addItem['id'] = -5;
      } else {
        addItem[this.colunaOpcao] = `<span class="adicionar-novo-dropdown"><i class="fa fa-plus"></i>&nbsp; Adicionar '${this.getFilterValue()}'</span>`;
      }
      if (!this._suggestions) {
        this._suggestions = [];
      }
      this._suggestions.push(addItem);
    }
  }

  getFilterValue(): string {
    if (this.multiple && this.multiInputEL) {
      return this.multiInputEL.nativeElement.value || "";
    } else if (this.inputEL) {
      return this.inputEL.nativeElement.value || "";
    }
  }

  valueTypedIsPresent(): boolean {
    if (this.suggestions && this.suggestions.length > 0) {
      for (let i = 0; i < this.suggestions.length; i++) {
        if (this.suggestions[i] && this.suggestions[i][this.field] && this.getFilterValue()) {
          if (this.suggestions[i][this.field].toLowerCase() == this.getFilterValue().toLowerCase()) {
            return true;
          }
        }
      }
    }
    return false;
  }

  getValueFiltradoAcao() {
    if (this.value) {
      return this.value.filter(obj => obj.acao != 3);
    } else {
      return [];
    }
  }

  onAddNovo(event) {
    this.onAdd.emit(this.getFilterValue());

    setTimeout(() => {
      this.hide();
    }, 150);
  }

  handleSuggestionsChange() {
    if (this._suggestions != null && this.loading) {
      this.highlightOption = null;
      if (this._suggestions.length) {
        this.noResults = false;
        if (!this.overlayVisible){
          this.show();
        }
        this.suggestionsUpdated = true;

        if (this.autoHighlight) {
          this.highlightOption = this._suggestions[0];
        }
      }
      else {
        this.noResults = true;

        if (this.emptyMessage) {
          if (!this.overlayVisible){
            this.show();
          }
          this.suggestionsUpdated = true;
        }
        else {
          this.hide();
        }
      }

      this.loading = false;
    }
  }

  ngAfterContentInit() {
    this.templates.forEach((item) => {
      switch (item.getType()) {
        case 'item':
          this.itemTemplate = item.template;
          break;

        case 'selectedItem':
          this.selectedItemTemplate = item.template;
          break;

        default:
          this.itemTemplate = item.template;
          break;
      }
    });
  }

  writeValue(value: any): void {
    this.value = value;
    this.filled = this.value && this.value != '';
    this.updateInputField();
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

  onInput(event: Event) {
    if (!this.inputKeyDown) {
      return;
    }

    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    let value = (<HTMLInputElement>event.target).value;
    if (!this.multiple && !this.forceSelection) {
      this.onModelChange(value);
      this.valorInternoModificado.emit(this.value);
      this.customValue.emit(value);
    }

    if (value.length === 0) {
      this.hide();
      this.onClear.emit(event);
    }

    if (value.length >= this.minLength) {
      this.timeout = setTimeout(() => {
        this.search(event, value);
      }, this.delay);
    }
    else {
      this.suggestions = null;
      this.hide();
    }
    this.updateFilledState();
    this.inputKeyDown = false;
  }

  onInputClick(event: MouseEvent) {
    if (this.documentClickListener) {
      this.inputClick = true;
    }
    if (!this.overlayVisible){
      this.show();
    }    
  }

  search(event: any, query: string) {
    //allow empty string but not undefined or null
    if (query === undefined || query === null) {
      return;
    }

    this.loading = true;

    this.completeMethod.emit({
      originalEvent: event,
      query: query
    });
  }

  selectItem(option: any, focus: boolean = true) {
    var deveEmitir = true;
    if (this.multiple) {
      this.value = this.value || [];
      if (!Array.isArray(this.value)){
          this.value = [].push(this.value);
      }
      
      var isRepetido = this.podeDuplicados ? false : this.value.some(opt => opt[this.field].toUpperCase() == option[this.field].toUpperCase());

      var isRepetidoChip = false;
      if (option.isAdd == true && this.multiInputEL.nativeElement.value.trim() != '')  {
        isRepetidoChip = this.value.some(opt => opt[this.field].toUpperCase() == this.multiInputEL.nativeElement.value.toUpperCase());
      }

      var isPseudoExcluido = this.value.some(opt => opt[this.field].toUpperCase() == option[this.field].toUpperCase() && opt.acao == 3);
      if (option && !isRepetido && !isPseudoExcluido) {
        if (option.isAdd && (this.multiInputEL.nativeElement.value.trim() == '' || isRepetidoChip == true)) {
          this.multiInputEL.nativeElement.value = '';
          return;
        }
        if (option.isAdd && this.multiInputEL.nativeElement.value.trim() != '') {
          let newItem = {};
          newItem['acao'] = 1;
          newItem[this.colunaOpcao] = this.multiInputEL.nativeElement.value;
          newItem[this.colunaChip] = this.multiInputEL.nativeElement.value;
          newItem[this.field] = this.multiInputEL.nativeElement.value;
          this.onAddNovo(null);
          if (!this.podeAdicionar) {
            this.value = [...this.value, newItem];          
            this.onModelChange(this.value);
            this.valorInternoModificado.emit(this.value);
          }
        } else if (!this.isSelected(option)) {
          if (option.isAdd){
            this.onAddVazio.emit(null);
            this.hide();
            return;
          }
          option.acao = 1;
          this.value = [...this.value, option];
          this.onModelChange(this.value);
          this.valorInternoModificado.emit(this.value);
        }
        this.multiInputEL.nativeElement.value = '';
      } else if (isPseudoExcluido) {
        option.acao = 2;
        for (let i = 0; i < this.value.length; i++) {
          if (this.value[i][this.field] == option[this.field]) {
            deveEmitir = false;
            this.value[i].acao = null;
            this.onChipRestaurado.emit({id: i, chip: this.value[i]});
          }
        }
      } else {
        deveEmitir = false;
        this.onDuplicado.emit(this.multiInputEL.nativeElement.value);
        this.multiInputEL.nativeElement.value = '';        
      }
    }
    else {
      if (option.isAdd) {
        let newItem = {};
        newItem['acao'] = 1;
        newItem[this.colunaOpcao] = this.inputEL.nativeElement.value;
        newItem[this.field] = this.inputEL.nativeElement.value;
        this.value = newItem;
        this.onAddNovo(null);
        this.onModelChange(this.value);
        this.valorInternoModificado.emit(this.value);
      } else {
        this.inputEL.nativeElement.value = this.field ? this.objectUtils.resolveFieldData(option, this.field) || '' : option;
        this.value = option;
        this.onModelChange(this.value);
        this.valorInternoModificado.emit(this.value);
      }
    }

    if (!option.isAdd) {
      if (deveEmitir) {
        this.onSelect.emit(option);
      }
      if (focus) {
        this.focusInput();
      }
    }
    this.updateFilledState();
  }

  show() {
    if (this.multiInputEL || this.inputEL) {
      let hasFocus = this.multiple ? document.activeElement == this.multiInputEL.nativeElement : document.activeElement == this.inputEL.nativeElement;

      if (!this.overlayVisible && hasFocus) {
        this.overlayVisible = true;
      }
    }
    let ddRect: ClientRect = this.el.nativeElement.getBoundingClientRect();

    setTimeout(() => {
      if (this.containerPanel && this.multiplicador != 1) {
        let maxSize = window.innerWidth - 50;
        let calculatedSize = (ddRect.width * this.multiplicador) - 2;
        this.containerPanel.nativeElement.style.width = (calculatedSize > maxSize ? maxSize : calculatedSize) + 'px';
        this.containerPanel.nativeElement.style.minWidth = (calculatedSize > maxSize ? maxSize : calculatedSize) + 'px';
      }
    }, 50);
    this.onOpen.emit(null);
  }

  onOverlayAnimationStart(event: AnimationEvent) {
    switch (event.toState) {
      case 'visible':
        this.overlay = event.element;
        this.appendOverlay();
        if (this.autoZIndex) {
          this.overlay.style.zIndex = String(this.baseZIndex + (++DomHandler.zindex));
        }
        this.alignOverlay();
        this.bindDocumentClickListener();
        break;

      case 'void':
        this.onOverlayHide();
        break;
    }
  }

  onOverlayAnimationDone(event: AnimationEvent) {
    /*if (event.toState === 'void') {
        this._suggestions = null;
    }*/
  }

  appendOverlay() {
    if (this.appendTo) {
      if (this.appendTo === 'body')
        document.body.appendChild(this.overlay);
      else
        this.domHandler.appendChild(this.overlay, this.appendTo);

      this.overlay.style.minWidth = this.domHandler.getWidth(this.el.nativeElement.children[0]) + 'px';
    }
  }

  restoreOverlayAppend() {
    if (this.overlay && this.appendTo) {
      this.el.nativeElement.appendChild(this.overlay);
    }
  }

  alignOverlay() {
    if (this.appendTo)
      this.domHandler.absolutePosition(this.overlay, (this.multiple ? this.multiContainerEL.nativeElement : this.inputEL.nativeElement));
    else
      this.domHandler.relativePosition(this.overlay, (this.multiple ? this.multiContainerEL.nativeElement : this.inputEL.nativeElement));
  }

  hide() {
    this.overlayVisible = false;
  }

  handleDropdownClick(event) {
    this.focusInput();
    let queryValue = this.multiple ? this.multiInputEL.nativeElement.value : this.inputEL.nativeElement.value;

    if (this.dropdownMode === 'blank')
      this.search(event, '');
    else if (this.dropdownMode === 'current')
      this.search(event, queryValue);

    this.onDropdownClick.emit({
      originalEvent: event,
      query: queryValue
    });
  }

  focusInput() {
    if (this.multiple)
      this.multiInputEL.nativeElement.focus();
    else
      this.inputEL.nativeElement.focus();
  }

  focusSearchInput() {
    this.focusInput();
  }

  removeByIndex(index: number) {
    this.value = this.value.filter((val, i) => i != index);
  }

  removeItem(item: any, index?: number) {
    let itemIndex = index || this.domHandler.index(item);
    let removedValue = this.value[itemIndex];

    console.log('removeItem', this.pseudoExcluir, this.excluirEmDuasEtapas , removedValue, this.value);
    if (this.pseudoExcluir && this.value[itemIndex].acao == 2) {
      this.value[itemIndex].acao = 3;
    }

    if (!this.excluirEmDuasEtapas) {
      let chip = { id: itemIndex, chip: removedValue };
      this.onUnselect.emit(chip);
    }

    if (!this.pseudoExcluir || this.value[itemIndex].acao == 1) {
      this.value = this.value.filter((val, i) => i != itemIndex);
    }

    this.onModelChange(this.value);
    this.valorInternoModificado.emit(this.value);
    this.updateFilledState();
  }

  /* removeItem(item: any) {
       let itemIndex = this.domHandler.index(item);
       let removedValue = this.value[itemIndex];
       this.value = this.value.filter((val, i) => i!=itemIndex);
       this.onModelChange(this.value);
       this.updateFilledState();
       this.onUnselect.emit(removedValue);
   }*/

  onKeydown(event) {

    if (event.key == "\\" || event.key == '"') {
      event.preventDefault();
    }

    if (this.overlayVisible) {
      let highlightItemIndex = this.findOptionIndex(this.highlightOption);

      switch (event.which) {
        //down
        case 40:
          if (highlightItemIndex != -1) {
            var nextItemIndex = highlightItemIndex + 1;
            if (nextItemIndex != (this.suggestions.length)) {
              this.highlightOption = this.suggestions[nextItemIndex];
              this.highlightOptionChanged = true;
            }
          }
          else {
            this.highlightOption = this.suggestions[0];
          }

          event.preventDefault();
          break;

        //up
        case 38:
          if (highlightItemIndex > 0) {
            let prevItemIndex = highlightItemIndex - 1;
            this.highlightOption = this.suggestions[prevItemIndex];
            this.highlightOptionChanged = true;
          }

          event.preventDefault();
          break;

        //enter
        case 13:
          if (this.highlightOption) {
            this.selectItem(this.highlightOption);
            this.hide();
          }
          event.preventDefault();
          break;

        //escape
        case 27:
          this.hide();
          event.preventDefault();
          break;


        //tab
        /*case 9:
          if (this.highlightOption) {
            this.selectItem(this.highlightOption);
          }
          this.hide();
          break;*/

        case 8:
          this.onBackspace.emit(event);
          break;
      }
    } else {
      switch (event.which) {
        //down
        case 40:
          if (this.suggestions) {
            this.search(event, event.target.value);
          }
          break;

        //enter
        case 13:
          if (this.multiple && this.multiInputEL.nativeElement.value && !this.forceSelection) {
            let newItem = {};
            newItem['acao'] = 1;
            newItem[this.colunaOpcao] = this.multiInputEL.nativeElement.value;
            newItem[this.colunaChip] = this.multiInputEL.nativeElement.value;
            newItem[this.field] = this.multiInputEL.nativeElement.value;
            this.selectItem(newItem);
          }
          event.preventDefault();
          break;

        //tab
        /*case 9:
          if (this.multiple && this.multiInputEL.nativeElement.value && !this.forceSelection) {
            let newItem = {};
            newItem['acao'] = 1;
            newItem[this.colunaOpcao] = this.multiInputEL.nativeElement.value;
            newItem[this.colunaChip] = this.multiInputEL.nativeElement.value;
            newItem[this.field] = this.multiInputEL.nativeElement.value;
            this.selectItem(newItem);
          }
          this.hide();
          break;
*/
        case 8:
          this.onBackspace.emit(event);
          break;
      }
    }

    /*if (this.multiple) {
        switch(event.which) {
            //backspace
            case 8:
                if (this.value && this.value.length && !this.multiInputEL.nativeElement.value) {
                    this.value = [...this.value];
                    const removedValue = this.value.pop();
                    this.onModelChange(this.value);
                    this.updateFilledState();
                    this.onUnselect.emit(removedValue);
                }
            break;
        }
    }*/

    this.inputKeyDown = true;
  }

  onKeyup(event) {
    this.onKeyUp.emit(event);
  }

  onInputFocus(event) {
    this.focus = true;
    this.onFocus.emit(event);
  }

  onInputBlur(event) {
    this.focus = false;
    this.onModelTouched();
    this.onBlur.emit(event);
    /*if (this.multiple && this.multiInputEL.nativeElement.value && !this.forceSelection) { //REMOVIDO ADD NO FOCUS OUT
      let newItem = {};
      newItem['acao'] = 1;
      if (this.podeAdicionar) {
        newItem['isAdd'] = true;
      }
      newItem[this.colunaOpcao] = this.multiInputEL.nativeElement.value;
      newItem[this.colunaChip] = this.multiInputEL.nativeElement.value;
      newItem[this.field] = this.multiInputEL.nativeElement.value;
      this.selectItem(newItem);
    }*/
  }

  onInputChange(event) {
    if (this.forceSelection && this.suggestions) {
      let valid = false;
      let inputValue = event.target.value.trim();

      if (this.suggestions) {
        for (let suggestion of this.suggestions) {
          let itemValue = this.field ? this.objectUtils.resolveFieldData(suggestion, this.field) : suggestion;
          if (itemValue && inputValue === itemValue.trim()) {
            valid = true;
            this.selectItem(suggestion, false);
            break;
          }
        }
      }

      if (!valid) {
        if (this.multiple) {
          this.multiInputEL.nativeElement.value = '';
        }
        else {
          this.value = null;
          this.inputEL.nativeElement.value = '';
        }

        this.onClear.emit(event);
        this.onModelChange(this.value);
        this.valorInternoModificado.emit(this.value);
      }
    }
  }

  onInputPaste(event: ClipboardEvent) {
    this.onKeydown(event);
  }

  isSelected(val: any): boolean {
    let selected: boolean = false;
    if (this.value && this.value.length) {
      for (let i = 0; i < this.value.length; i++) {
        if (this.objectUtils.equals(this.value[i], val, this.dataKey)) {
          selected = true;
          break;
        }
      }
    }
    return selected;
  }

  findOptionIndex(option): number {
    let index: number = -1;
    if (this.suggestions) {
      for (let i = 0; i < this.suggestions.length; i++) {
        if (this.objectUtils.equals(option, this.suggestions[i])) {
          index = i;
          break;
        }
      }
    }

    return index;
  }

  updateFilledState() {
    if (this.multiple)
      this.filled = (this.value && this.value.length) || (this.multiInputEL && this.multiInputEL.nativeElement && this.multiInputEL.nativeElement.value != '');
    else
      this.filled = (this.inputFieldValue && this.inputFieldValue != '') || (this.inputEL && this.inputEL.nativeElement && this.inputEL.nativeElement.value != '');;
  }

  updateInputField() {
    let formattedValue = this.value ? (this.field ? this.objectUtils.resolveFieldData(this.value, this.field) || '' : this.value) : '';
    this.inputFieldValue = formattedValue;

    if (this.inputEL && this.inputEL.nativeElement) {
      this.inputEL.nativeElement.value = formattedValue;
    }

    this.updateFilledState();
  }

  bindDocumentClickListener() {
    if (!this.documentClickListener) {
      this.documentClickListener = this.renderer.listen('document', 'click', (event) => {
        if (event.which === 3) {
          return;
        }

        if (!this.inputClick && !this.isDropdownClick(event)) {
          this.hide();
        }

        this.inputClick = false;
        this.cd.markForCheck();
      });
    }
  }

  isDropdownClick(event) {
    if (this.dropdown) {
      let target = event.target;
      return (target === this.dropdownButton.nativeElement || target.parentNode === this.dropdownButton.nativeElement);
    }
    else {
      return false;
    }
  }

  unbindDocumentClickListener() {
    if (this.documentClickListener) {
      this.documentClickListener();
      this.documentClickListener = null;
    }
  }

  onOverlayHide() {
    this.unbindDocumentClickListener();
    this.overlay = null;
  }

  ngOnDestroy() {
    this.restoreOverlayAppend();
    this.onOverlayHide();
  }
}

@NgModule({
  imports: [CommonModule, InputTextModule, ButtonModule, SharedModule],
  exports: [AutoComplete, SharedModule],
  declarations: [AutoComplete]
})
export class AutoCompleteModule { }
