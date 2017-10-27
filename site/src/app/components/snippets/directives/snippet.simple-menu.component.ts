//snip:skip
import { Component, forwardRef } from '@angular/core';
import { AbstractSnippetComponent } from '../abstract.snippet.component';
//snip:endskip
@Component({
    //snip:skip
    providers: [{provide: AbstractSnippetComponent, useExisting: forwardRef(() => SnippetSimpleMenuComponent)}],
    //snip:endskip
    selector: 'blox-snippet-simple-menu',
    templateUrl: './snippet.simple-menu.component.html',
    styleUrls: ['./snippet.simple-menu.component.scss']
})
export class SnippetSimpleMenuComponent/*snip:skip*/extends AbstractSnippetComponent/*snip:endskip*/ {
    open = false;
    position = 'tl';
    lastChoice: string = '<none>';

    //snip:skip
    constructor() {
        super({
          'html': require('!raw-loader!./snippet.simple-menu.component.html'),
          'scss': require('!raw-loader!./snippet.simple-menu.component.scss'),
          'typescript': require('!raw-loader!./snippet.simple-menu.component.ts')
        });
    }
    //snip:endskip

    select(choice) {
        this.lastChoice = choice;
    }

    get pTop() {
        return (this.position === 'tl' || this.position === 'tr') ? 0 : null;
    }

    get pBottom() {
        return (this.position === 'bl' || this.position === 'br') ? 0 : null;        
    }

    get pLeft() {
        return (this.position === 'tl' || this.position === 'bl') ? 0 : null;        
    }

    get pRight() {
        return (this.position === 'tr' || this.position === 'br') ? 0 : null;        
    }
}
