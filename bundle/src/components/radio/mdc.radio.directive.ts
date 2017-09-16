import { AfterContentInit, Component, ContentChild, Directive, ElementRef, EventEmitter, HostBinding, HostListener,
  Input, OnDestroy, OnInit, Optional, Output, Provider, Renderer2, Self, ViewChild, ViewEncapsulation, forwardRef } from '@angular/core';
import { NgControl } from '@angular/forms';
import { MDCRadioFoundation } from '@material/radio';
import { MdcRadioAdapter } from './mdc.radio.adapter';
import { AbstractMdcInput } from '../abstract/abstract.mdc.input';
import { asBoolean } from '../../utils/value.utils';
import { MdcEventRegistry } from '../../utils/mdc.event.registry';

@Directive({
    selector: 'input[mdcRadioInput][type=radio]',
    providers: [{provide: AbstractMdcInput, useExisting: forwardRef(() => MdcRadioInputDirective) }]
})
export class MdcRadioInputDirective extends AbstractMdcInput {
    @HostBinding('class.mdc-radio__native-control') hasHostClass = true;
    private _id: string;
    private _disabled = false;

    constructor(public elementRef: ElementRef, @Optional() @Self() public ngControl: NgControl) {
        super();
    }

    @HostBinding()
    @Input() get id() {
        return this._id;
    }
  
    set id(value: string) {
        this._id = value;
    }

    @HostBinding()
    @Input() get disabled() {
        return this.ngControl ? this.ngControl.disabled : this._disabled;
    }

    set disabled(value: any) {
        this._disabled = asBoolean(value);
    }
}

@Directive({
    selector: '[mdcRadio]'
})
export class MdcRadioDirective implements AfterContentInit, OnDestroy {
    @HostBinding('class.mdc-radio') hasHostClass = true;
    @ContentChild(MdcRadioInputDirective) mdcInput: MdcRadioInputDirective;
    private mdcAdapter: MdcRadioAdapter = {
        addClass: (className: string) => {
            this.renderer.addClass(this.root.nativeElement, className);
        },
        removeClass: (className: string) => {
            this.renderer.removeClass(this.root.nativeElement, className);
        },
        getNativeControl: () => this.mdcInput ? this.mdcInput.elementRef.nativeElement : null
    };
    private foundation: { init: Function, destroy: Function } = new MDCRadioFoundation(this.mdcAdapter);

    constructor(private renderer: Renderer2, private root: ElementRef, private registry: MdcEventRegistry) {
    }

    ngAfterContentInit() {
        this.addBackground();
        this.foundation.init();
    }

    ngOnDestroy() {
        this.foundation.destroy();
    }

    private addBackground() {
        let outerCircle = this.renderer.createElement('div');
        this.renderer.addClass(outerCircle, 'mdc-radio__outer-circle');
        let innerCircle = this.renderer.createElement('div');
        this.renderer.addClass(innerCircle, 'mdc-radio__inner-circle');
        let bg = this.renderer.createElement('div');
        this.renderer.appendChild(bg, outerCircle);
        this.renderer.appendChild(bg, innerCircle);
        this.renderer.addClass(bg, 'mdc-radio__background');
        this.renderer.appendChild(this.root.nativeElement, bg);
    }

    @HostBinding('class.mdc-radio--disabled') get disabled() {
        return this.mdcInput == null || this.mdcInput.disabled;
    }
}