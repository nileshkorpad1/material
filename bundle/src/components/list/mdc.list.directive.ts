import { AfterContentInit, Component, ContentChildren, Directive, ElementRef, HostBinding, HostListener,
  Input, QueryList, Renderer2 } from '@angular/core';
import { asBoolean } from '../../utils/value.utils';
import { MdcButtonDirective } from '../button/mdc.button.directive';

/**
 * Directive for a separator in a list.
 * This directive, if used, should be the child of an <code>MdcListDirective</code>.
 * This directive also adds the "role" attribute to its element.
 */
@Directive({
    selector: '[mdcListDivider]',
})
export class MdcListDividerDirective {
    @HostBinding('class.mdc-list-divider') _cls = true;
    @HostBinding('attr.role') _role = 'separator';
    private _inset = false;
    
    constructor() {}

    /**
     * When this input is defined and does not have value false, the divider is styled with
     * an inset.
     */
    @Input() @HostBinding('class.mdc-list-divider--inset')
    get mdcInset() {
        return this._inset;
    }

    set mdcInset(val: any) {
        this._inset = asBoolean(val);
    }
}

/**
 * Directive for the items of a material list.
 * This directive should be used for the direct children of a <code>MdcListDirective</code>.
 */
@Directive({
    selector: '[mdcListItem]'
})
export class MdcListItemDirective {
    @HostBinding('class.mdc-list-item') _cls = true;
    @HostBinding('attr.role') public _role = null;
    private _disabled = false;
    /**
     * When a list is used inside an <code>mdcSimpleMenu</code>, or <code>mdcSelect</code>,
     * this property can be used to assign a value to this choice/selection item.
     */
    @Input() mdcValue;

    constructor(public _elm: ElementRef) {}

    /**
     * When a list is used inside an <code>mdcSimpleMenu</code>, or <code>mdcSelect</code>,
     * this property can be used to disable the item.
     */
    @Input()
    get mdcDisabled() {
        return this._disabled;
    }

    set mdcDisabled(val: any) {
        this._disabled = asBoolean(val);
    }

    @HostBinding('attr.tabindex') get _tabIndex() {
        if (this._role === 'menuitem')
            return this._disabled ? -1 : 0;
        return null;
    }

    @HostBinding('attr.aria-disabled') get _ariaDisabled() {
        if (this._role === 'menuitem' && this._disabled)
            return 'true';
        return null;
    }
}

/**
 * Directive to mark the first line of an item with "two line list" styling
 * according to the Material Design spec.
 * This directive, if used, should be the child of an <code>MdcListItemDirective</code>.
 * Using this directive inside any <code>mdcListItem</code> will put the list
 * "two line" mode.
 */
@Directive({
    selector: '[mdcListItemText]'
})
export class MdcListItemTextDirective {
    @HostBinding('class.mdc-list-item__text') _cls = true;

    constructor() {}
}

/**
 * Directive for the secondary text of an item with "two line list" styling.
 */
@Directive({
    selector: '[mdcListItemTextSecondary]',
})
export class MdcListItemTextSecondaryDirective {
    @HostBinding('class.mdc-list-item__text__secondary') _cls = true;
    
    constructor() {}
}

/**
 * Directive for the start detail item of a list item.
 * This directive, if used, should be the child of an <code>MdcListItemDirective</code>.
 */
@Directive({
    selector: '[mdcListItemStartDetail]',
})
export class MdcListItemStartDetailDirective {
    @HostBinding('class.mdc-list-item__start-detail') _cls = true;
    
    constructor() {}
}

/**
 * Directive for the end detail item of a list item.
 * This directive, if used, should be the child of an <code>MdcListItemDirective</code>.
 */
@Directive({
    selector: '[mdcListItemEndDetail]',
})
export class MdcListItemEndDetailDirective {
    @HostBinding('class.mdc-list-item__end-detail') _cls = true;
    
    constructor() {}
}

/**
 * Directive for a material list.
 * The children of this directive should either be <code>MdcListItemDirective</code>,
 * or <code>MdcListDividerDirective</code> elements.
 * This directive can optionally be contained in a <code>MdcListGroupDirective</code>.
 */
@Directive({
    selector: '[mdcList]',
})
export class MdcListDirective implements AfterContentInit {
    @HostBinding('class.mdc-list') _cls = true;
    @ContentChildren(MdcListItemDirective) _items: QueryList<MdcListItemDirective>;
    @ContentChildren(MdcListItemTextDirective, {descendants: true}) _texts: QueryList<MdcListItemTextDirective>;
    @HostBinding('class.mdc-list--two-line') _twoLine = false;
    @HostBinding('attr.role') _role: 'menu' | null = null;
    private _dense = false;
    private _avatar = false;
    
    constructor(public _elm: ElementRef) {}

    ngAfterContentInit() {
        this.updateItemRoles();
        this._items.changes.subscribe(() => {
            this.updateItemRoles();
        });
        this._texts.changes.subscribe(_ => this._twoLine = this._texts.length > 0);
        this._twoLine = this._texts.length > 0;
    }

    private updateItemRoles() {
        let itemRole = this._role === 'menu' ? 'menuitem' : null;
        this._items.forEach(item => {
            item._role = itemRole;
        });
    }

    @HostBinding('class.mdc-simple-menu__items') get _isMenu() {
        return this._role === 'menu';
    }

    set _isMenu(val: boolean) {
        if (val)
            this._role = 'menu';
        else if (this._role === 'menu')
            this._role = null;
        this.updateItemRoles();
    }

    /**
     * When this input is defined and does not have value false, the list will be styled more
     * compact.
     */
    @Input() @HostBinding('class.mdc-list--dense')
    get mdcDense() {
        return this._dense;
    }
    
    set mdcDense(val: any) {
        this._dense = asBoolean(val);
    }

    /**
     * When this input is defined and does not have value false, elements with directive <code>mdcListItemStartDetail</code>
     * will be styled for avatars: large, circular elements that lend themselves well to contact images, profile pictures, etc. 
     */
    @Input() @HostBinding('class.mdc-list--avatar-list')
    get mdcAvatarList() {
        return this._avatar;
    }

    set mdcAvatarList(val: any) {
        this._avatar = asBoolean(val);
    }
}

/**
 * Directive for a header inside a list group (<code>MdcListGroupDirective</code>) directive.
 */
@Directive({
    selector: '[mdcListGroupSubHeader]'
})
export class MdcListGroupSubHeaderDirective {
    @HostBinding('class.mdc-list-group__subheader') _cls = true;

    constructor() {}
}


/**
 * Directive for a material designed list group, grouping several
 * <code>MdcListDirective</code> lists.
 * List groups should contain elements with <code>mdcListGroupSubHeader</code>,
 * and <code>mdcList</code> directives.
 */
@Directive({
    selector: '[mdcListGroup]'
})
export class MdcListGroupDirective {
    @HostBinding('class.mdc-list-group') _cls = true;

    constructor() {}
}
