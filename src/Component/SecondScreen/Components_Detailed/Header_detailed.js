import React from 'react'

export default function Header_detailed() {
    return (
        <header class="crancy-header">
            <div class="container g-0">
                <div class="row g-0">
                    <div class="col-12">
                        <div class="crancy-header__inner">
                            <div class="crancy-header__middle">
                                <div class="crancy-header__left">
                                    <div class="crancy-header__nav-bottom">
                                        <div class="logo crancy-sidebar-padding">
                                            <a class="crancy-logo">
                                                <img
                                                    class="crancy-logo__main"
                                                    src="image/logo/jsoft-initial.png"
                                                />
                                                <img
                                                    class="crancy-logo__main--small"
                                                    src="image/logo/jsoft-initial.png"
                                                />
                                            </a>
                                        </div>
                                    </div>

                                    <div id="crancy__sicon" class="crancy__sicon close-icon">
                                        <i class="fas fa-angle-left" style={{color: '#ffffff'}}></i>
                                    </div>
                                </div>
                                <div class="geex-content__header">
                                    <div class="geex-content__header__content">
                                        <div class="geex-content__header__customizer">
                                            <h2 class="geex-content__header__title">
                                                Sales Efficiency Analysis Dashboard
                                            </h2>
                                        </div>
                                    </div>
                                    <div class="geex-content__header__action">
                                        <div class="geex-content__header__action__wrap">
                                            <ul class="geex-content__header__quickaction">
                                                <li class="from-date-to-date-header__quickaction">
                                                    <h5>
                                                        Synchronize-Date :
                                                        <span class="text-muted"
                                                        >01/03/2023 11:53:00</span
                                                        >
                                                    </h5>
                                                </li>
                                                <li class="geex-content__header__quickaction__item">
                                                    <div
                                                        class="geex-content__header__quickaction__link crancy-header__alarm top-header-icon"
                                                        id="crancy-header__full"
                                                    >
                                                        <i class="fas fa-expand-alt"></i>
                                                    </div>
                                                </li>
                                                <li class="geex-content__header__quickaction__item">
                                                    <div
                                                        class="geex-content__header__quickaction__link"
                                                    >
                                                        <i class="fas fa-sync"></i>
                                                    </div>
                                                </li>
                                                <li class="geex-content__header__quickaction__item">
                                                    <a href="index.html">
                                                        <div
                                                            class="geex-content__header__quickaction__link"
                                                        >
                                                            <i class="fas fa-reply-all"></i>
                                                        </div>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}



