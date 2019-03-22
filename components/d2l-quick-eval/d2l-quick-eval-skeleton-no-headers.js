import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * @customElement
 * @polymer
 */
class D2LEvaluationHubSkeletonNoHeaders extends PolymerElement {
	static get template() {
		return html`
			<style>
				:host {
                    display: inline-block;
                }
                .desktop { 
                    width: 100%;
                }
                .mobile { 
                    display: none;
                }
                @media (max-width: 768px) {
                    .mobile {
                        display: block;
                    }
                    .desktop { 
                        display: none;
                    }
                }
            </style>
             <div class="desktop">
                <?xml version="1.0" encoding="UTF-8" standalone="no"?>
                <svg width="100%" viewBox="0 0 1170 197" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <!-- Generator: Sketch 50.2 (55047) - http://www.bohemiancoding.com/sketch -->
                    <title>EH - Thin - Flat List - Submission - oldest to newest</title>
                    <desc>Created with Sketch.</desc>
                    <defs></defs>
                    <g id="EH---Thin---Flat-List---Submission---oldest-to-newest" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <rect id="Rectangle" fill="#f2f3f5" x="0" y="38" width="30" height="30" rx="4"></rect>
                        <rect id="Rectangle-Copy-9" fill="#f2f3f5" x="0" y="93" width="30" height="30" rx="4"></rect>
                        <rect id="Rectangle-Copy-15" fill="#f2f3f5" x="0" y="148" width="30" height="30" rx="4"></rect>
                        <rect id="Rectangle-Copy-6" fill="#f2f3f5" x="280" y="45" width="18" height="18" rx="4"></rect>
                        <rect id="Rectangle-Copy-10" fill="#f2f3f5" x="280" y="100" width="18" height="18" rx="4"></rect>
                        <rect id="Rectangle-Copy-16" fill="#f2f3f5" x="280" y="155" width="18" height="18" rx="4"></rect>
                        <rect id="Rectangle" fill="#f2f3f5" x="40" y="46" width="120" height="14" rx="4"></rect>
                        <rect id="Rectangle-Copy-11" fill="#f2f3f5" x="40" y="101" width="120" height="14" rx="4"></rect>
                        <rect id="Rectangle-Copy-17" fill="#f2f3f5" x="40" y="156" width="120" height="14" rx="4"></rect>
                        <rect id="Rectangle-Copy-5" fill="#f2f3f5" x="315" y="46" width="240" height="14" rx="4"></rect>
                        <rect id="Rectangle-Copy-12" fill="#f2f3f5" x="315" y="101" width="240" height="14" rx="4"></rect>
                        <rect id="Rectangle-Copy-18" fill="#f2f3f5" x="315" y="156" width="240" height="14" rx="4"></rect>
                        <rect id="Rectangle-Copy-7" fill="#f2f3f5" x="620" y="46" width="240" height="14" rx="4"></rect>
                        <rect id="Rectangle-Copy-13" fill="#f2f3f5" x="620" y="101" width="240" height="14" rx="4"></rect>
                        <rect id="Rectangle-Copy-19" fill="#f2f3f5" x="620" y="156" width="240" height="14" rx="4"></rect>
                        <rect id="Rectangle-Copy-8" fill="#f2f3f5" x="930" y="46" width="180" height="14" rx="4"></rect>
                        <rect id="Rectangle-Copy-14" fill="#f2f3f5" x="930" y="101" width="180" height="14" rx="4"></rect>
                        <rect id="Rectangle-Copy-20" fill="#f2f3f5" x="930" y="156" width="180" height="14" rx="4"></rect>
                        <path d="M 0 80 L 1170 80" id="Line-Copy" stroke="#f2f3f5" stroke-linecap="square"></path>
                        <path d="M 0 135 L 1170 135" id="Line-Copy-2" stroke="#f2f3f5" stroke-linecap="square"></path>
                    </g>
                </svg> 
            </div>
            <div class="mobile">
                <?xml version="1.0" encoding="UTF-8" standalone="no"?>
                <svg width="100%" viewBox="0 0 237 209" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <!-- Generator: Sketch 50.2 (55047) - http://www.bohemiancoding.com/sketch -->
                    <title>mobile assignment end copy</title>
                    <desc>Created with Sketch.</desc>
                    <defs></defs>
                    <g id="mobile-assignment-end-copy" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <rect id="Rectangle-Copy-22" fill="#F2F3F5" x="0" y="42" width="30" height="30" rx="4"></rect>
                        <rect id="Rectangle-Copy-23" fill="#F2F3F5" x="0" y="97" width="30" height="30" rx="4"></rect>
                        <rect id="Rectangle-Copy-24" fill="#F2F3F5" x="0" y="152" width="30" height="30" rx="4"></rect>
                        <rect id="Rectangle-Copy-25" fill="#F2F3F5" x="39" y="50" width="120" height="14" rx="4"></rect>
                        <rect id="Rectangle-Copy-26" fill="#F2F3F5" x="39" y="105" width="120" height="14" rx="4"></rect>
                        <rect id="Rectangle-Copy-27" fill="#F2F3F5" x="39" y="160" width="120" height="14" rx="4"></rect>
                        <path d="M-1,83.5 L237,83.5" id="Line-Copy-4" stroke="#F2F3F5" stroke-linecap="square"></path>
                        <path d="M-1,138.5 L237,138.5" id="Line-Copy-5" stroke="#F2F3F5" stroke-linecap="square"></path>
                    </g>
                </svg>   
            </div>    
		`;
	}

	static get is() { return 'd2l-quick-eval-skeleton-no-headers'; }

}

window.customElements.define('d2l-quick-eval-skeleton-no-headers', D2LEvaluationHubSkeletonNoHeaders);
