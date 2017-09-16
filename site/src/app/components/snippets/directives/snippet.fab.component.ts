//snip:skip
import { Component, forwardRef } from '@angular/core';
import { AbstractSnippetComponent } from '../abstract.snippet.component';
//snip:endskip
@Component({
  //snip:skip
  providers: [{provide: AbstractSnippetComponent, useExisting: forwardRef(() => SnippetFabComponent) }],
  //snip:endskip
  selector: 'blox-snippet-fab',
  templateUrl: './snippet.fab.component.html'
})
export class SnippetFabComponent/*snip:skip*/extends AbstractSnippetComponent/*snip:endskip*/ {
    //snip:skip
    constructor() {
        super({
          'html': require('!raw-loader!./snippet.fab.component.html'),
          'typescript': require('!raw-loader!./snippet.fab.component.ts')
        });
    }
    //snip:endskip
}