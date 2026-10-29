/**
 * OJA REALTY — Leads Management API Integration & Floating Lead Capture
 * 
 * Endpoint: https://leadsmanagment.hindustandigitalservices.com/api/forms/submit/8ae35fb5-dca9-40e4-b207-d63a36d800de
 * Submission Types:
 *   - All Website Forms: "form"
 *   - WhatsApp Floating Popup: "whatsapp"
 *   - Call Floating Popup: "contact"
 */

(function($) {
    'use strict';

    var OJA_CONFIG = {
        apiEndpoint: 'https://leadsmanagment.hindustandigitalservices.com/api/forms/submit/8ae35fb5-dca9-40e4-b207-d63a36d800de',
        phone: '+91 78755 11119',
        telNumber: '+917875511119',
        whatsappNumber: '917875511119',
        whatsappPrefill: 'Hi Oja Realty, I am interested in property advisory and project consultation.'
    };

    /**
     * Submit lead to Leads Management API
     * Returns a jQuery Promise
     */
    function submitLeadToAPI(payload) {
        return $.ajax({
            type: 'POST',
            url: OJA_CONFIG.apiEndpoint,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            data: JSON.stringify(payload),
            timeout: 12000
        });
    }

    /**
     * Clean and validate phone number (expects 10 digits)
     */
    function cleanPhoneNumber(rawPhone) {
        if (!rawPhone) return '';
        var digits = rawPhone.toString().replace(/\D/g, '');
        // If 12 digits starting with 91, strip country code
        if (digits.length === 12 && digits.indexOf('91') === 0) {
            digits = digits.substring(2);
        }
        // If 11 digits starting with 0, strip leading 0
        if (digits.length === 11 && digits.indexOf('0') === 0) {
            digits = digits.substring(1);
        }
        return digits;
    }

    function isValidPhone(phone) {
        var clean = cleanPhoneNumber(phone);
        return clean.length === 10;
    }

    /**
     * Initialize Floating Lead Capture Widget
     */
    function initFloatingWidget() {
        if ($('.floating-actions-container').length === 0) {
            var widgetHTML = [
                '<div class="floating-actions-container" role="region" aria-label="Quick Contact & Actions">',
                '    <!-- WhatsApp Floating Button -->',
                '    <button type="button" class="floating-btn floating-btn-whatsapp" id="floatingWhatsappBtn" aria-label="Chat on WhatsApp" title="Chat on WhatsApp">',
                '        <i class="fa-brands fa-whatsapp"></i>',
                '    </button>',
                '    <!-- Call Floating Button -->',
                '    <button type="button" class="floating-btn floating-btn-call" id="floatingCallBtn" aria-label="Call Oja Realty" title="Call Oja Realty">',
                '        <i class="fa-solid fa-phone"></i>',
                '    </button>',
                '    <!-- Scroll to Top Button -->',
                '    <button type="button" class="floating-btn floating-btn-scrolltop" id="floatingScrollTopBtn" aria-label="Scroll to top" title="Scroll to top">',
                '        <i class="fa-solid fa-chevron-up"></i>',
                '    </button>',
                '</div>',
                '',
                '<!-- WhatsApp Floating Popup Form -->',
                '<div class="floating-popup" id="whatsappLeadPopup" role="dialog" aria-modal="true" aria-labelledby="waPopupTitle">',
                '    <div class="floating-popup-header">',
                '        <div class="floating-popup-header-info">',
                '            <div class="floating-popup-icon-badge whatsapp"><i class="fa-brands fa-whatsapp"></i></div>',
                '            <div class="floating-popup-titles">',
                '                <h4 id="waPopupTitle">Chat on WhatsApp</h4>',
                '                <p>Oja Realty Official Support</p>',
                '            </div>',
                '        </div>',
                '        <button type="button" class="floating-popup-close" id="waPopupClose" aria-label="Close">&times;</button>',
                '    </div>',
                '    <div class="floating-popup-body">',
                '        <form id="whatsappLeadForm" novalidate>',
                '            <div class="floating-form-group">',
                '                <label for="waLeadName">Full Name <span class="req-star">*</span></label>',
                '                <input type="text" id="waLeadName" class="floating-input" name="name" placeholder="Enter your full name" required autocomplete="name">',
                '                <div class="floating-field-error" id="waNameError">Please enter your full name.</div>',
                '            </div>',
                '            <div class="floating-form-group">',
                '                <label for="waLeadPhone">Contact Number <span class="req-star">*</span></label>',
                '                <input type="tel" id="waLeadPhone" class="floating-input" name="phone" placeholder="Enter 10-digit mobile number" required maxlength="10" inputmode="numeric" autocomplete="tel">',
                '                <div class="floating-field-error" id="waPhoneError">Please enter a valid 10-digit mobile number.</div>',
                '            </div>',
                '            <button type="submit" class="floating-submit-btn floating-submit-whatsapp" id="waSubmitBtn">',
                '                <i class="fa-brands fa-whatsapp"></i> Continue to WhatsApp',
                '            </button>',
                '        </form>',
                '        <div class="floating-status-msg" id="waStatusMsg" style="display:none;"></div>',
                '        <a href="#" target="_blank" class="floating-direct-btn floating-direct-whatsapp" id="waDirectBtn" style="display:none;">',
                '            <i class="fa-brands fa-whatsapp"></i> Open WhatsApp Chat',
                '        </a>',
                '        <p class="floating-popup-privacy">We respect your privacy. Oja Realty will never share your details.</p>',
                '    </div>',
                '</div>',
                '',
                '<!-- Call Floating Popup Form -->',
                '<div class="floating-popup" id="callLeadPopup" role="dialog" aria-modal="true" aria-labelledby="callPopupTitle">',
                '    <div class="floating-popup-header">',
                '        <div class="floating-popup-header-info">',
                '            <div class="floating-popup-icon-badge call"><i class="fa-solid fa-phone"></i></div>',
                '            <div class="floating-popup-titles">',
                '                <h4 id="callPopupTitle">Connect via Call</h4>',
                '                <p>Speak with Oja Realty Advisor</p>',
                '            </div>',
                '        </div>',
                '        <button type="button" class="floating-popup-close" id="callPopupClose" aria-label="Close">&times;</button>',
                '    </div>',
                '    <div class="floating-popup-body">',
                '        <form id="callLeadForm" novalidate>',
                '            <div class="floating-form-group">',
                '                <label for="callLeadName">Full Name <span class="req-star">*</span></label>',
                '                <input type="text" id="callLeadName" class="floating-input" name="name" placeholder="Enter your full name" required autocomplete="name">',
                '                <div class="floating-field-error" id="callNameError">Please enter your full name.</div>',
                '            </div>',
                '            <div class="floating-form-group">',
                '                <label for="callLeadPhone">Contact Number <span class="req-star">*</span></label>',
                '                <input type="tel" id="callLeadPhone" class="floating-input" name="phone" placeholder="Enter 10-digit mobile number" required maxlength="10" inputmode="numeric" autocomplete="tel">',
                '                <div class="floating-field-error" id="callPhoneError">Please enter a valid 10-digit mobile number.</div>',
                '            </div>',
                '            <button type="submit" class="floating-submit-btn floating-submit-call" id="callSubmitBtn">',
                '                <i class="fa-solid fa-phone"></i> Continue to Call',
                '            </button>',
                '        </form>',
                '        <div class="floating-status-msg" id="callStatusMsg" style="display:none;"></div>',
                '        <a href="tel:' + OJA_CONFIG.telNumber + '" class="floating-direct-btn floating-direct-call" id="callDirectBtn" style="display:none;">',
                '            <i class="fa-solid fa-phone"></i> Call Now (' + OJA_CONFIG.phone + ')',
                '        </a>',
                '        <p class="floating-popup-privacy">We respect your privacy. Oja Realty will never share your details.</p>',
                '    </div>',
                '</div>'
            ].join('\n');

            $('body').append(widgetHTML);
        }

        bindFloatingEvents();
    }

    /**
     * Bind Popup and Floating button event listeners
     */
    function bindFloatingEvents() {
        var $waBtn = $('#floatingWhatsappBtn');
        var $callBtn = $('#floatingCallBtn');
        var $scrollTopBtn = $('#floatingScrollTopBtn');
        var $waPopup = $('#whatsappLeadPopup');
        var $callPopup = $('#callLeadPopup');

        // Toggle WhatsApp Popup
        $waBtn.off('click').on('click', function(e) {
            e.stopPropagation();
            $callPopup.hide();
            $waPopup.fadeToggle(200, function() {
                if ($waPopup.is(':visible')) {
                    $('#waLeadName').focus();
                }
            });
        });

        // Toggle Call Popup
        $callBtn.off('click').on('click', function(e) {
            e.stopPropagation();
            $waPopup.hide();
            $callPopup.fadeToggle(200, function() {
                if ($callPopup.is(':visible')) {
                    $('#callLeadName').focus();
                }
            });
        });

        // Close Buttons
        $('#waPopupClose').off('click').on('click', function(e) {
            e.stopPropagation();
            $waPopup.fadeOut(150);
        });

        $('#callPopupClose').off('click').on('click', function(e) {
            e.stopPropagation();
            $callPopup.fadeOut(150);
        });

        // Prevent click inside popups from closing them
        $waPopup.off('click').on('click', function(e) {
            e.stopPropagation();
        });
        $callPopup.off('click').on('click', function(e) {
            e.stopPropagation();
        });

        // Close popups on click outside
        $(document).off('click.ojaFloating').on('click.ojaFloating', function() {
            if ($waPopup.is(':visible')) $waPopup.fadeOut(150);
            if ($callPopup.is(':visible')) $callPopup.fadeOut(150);
        });

        // Close on ESC key
        $(document).off('keydown.ojaFloating').on('keydown.ojaFloating', function(e) {
            if (e.key === 'Escape' || e.keyCode === 27) {
                if ($waPopup.is(':visible')) $waPopup.fadeOut(150);
                if ($callPopup.is(':visible')) $callPopup.fadeOut(150);
            }
        });

        // Scroll to Top behavior
        $(window).off('scroll.ojaScrollTop').on('scroll.ojaScrollTop', function() {
            if ($(window).scrollTop() > 300) {
                $scrollTopBtn.addClass('show');
            } else {
                $scrollTopBtn.removeClass('show');
            }
        });

        $scrollTopBtn.off('click').on('click', function(e) {
            e.preventDefault();
            $('html, body').animate({ scrollTop: 0 }, 500);
        });

        // Handle WhatsApp Popup Submission
        var isWaSubmitting = false;
        $('#whatsappLeadForm').off('submit').on('submit', function(e) {
            e.preventDefault();
            if (isWaSubmitting) return;

            var $nameInput = $('#waLeadName');
            var $phoneInput = $('#waLeadPhone');
            var name = ($nameInput.val() || '').trim();
            var phone = ($phoneInput.val() || '').trim();
            var cleanPhone = cleanPhoneNumber(phone);

            var hasError = false;

            if (name.length < 2) {
                $nameInput.addClass('is-invalid');
                $('#waNameError').slideDown(150);
                hasError = true;
            } else {
                $nameInput.removeClass('is-invalid');
                $('#waNameError').slideUp(150);
            }

            if (!isValidPhone(phone)) {
                $phoneInput.addClass('is-invalid');
                $('#waPhoneError').slideDown(150);
                hasError = true;
            } else {
                $phoneInput.removeClass('is-invalid');
                $('#waPhoneError').slideUp(150);
            }

            if (hasError) return;

            // Prepare Payload
            var payload = {
                name: name,
                fullName: name,
                phone: cleanPhone,
                number: cleanPhone,
                contact: cleanPhone,
                mobile: cleanPhone,
                buttonType: 'whatsapp',
                type: 'whatsapp',
                source: 'floating_whatsapp_popup',
                service: 'WhatsApp Property Enquiry'
            };

            var $submitBtn = $('#waSubmitBtn');
            var originalBtnHtml = $submitBtn.html();
            isWaSubmitting = true;
            $submitBtn.prop('disabled', true).html('<i class="fa-solid fa-spinner fa-spin"></i> Submitting...');
            $('#waStatusMsg').slideUp(100).removeClass('success error').empty();

            submitLeadToAPI(payload)
                .done(function() {
                    $('#waStatusMsg')
                        .addClass('success')
                        .html('<i class="fa-solid fa-circle-check"></i> Details submitted successfully! Redirecting to WhatsApp...')
                        .slideDown(200);

                    var waUrl = 'https://wa.me/' + OJA_CONFIG.whatsappNumber + '?text=' + encodeURIComponent(OJA_CONFIG.whatsappPrefill);
                    
                    // Show fallback direct button in case popup is blocked
                    $('#waDirectBtn').attr('href', waUrl).slideDown(200);
                    $('#whatsappLeadForm').slideUp(200);

                    // Attempt automatic redirect
                    setTimeout(function() {
                        var win = window.open(waUrl, '_blank');
                        if (!win || win.closed || typeof win.closed === 'undefined') {
                            // Popup was blocked, inform user to click button
                            $('#waStatusMsg').html('<i class="fa-solid fa-circle-check"></i> Please click the button below to open WhatsApp:');
                        }
                    }, 500);
                })
                .fail(function(xhr) {
                    isWaSubmitting = false;
                    $submitBtn.prop('disabled', false).html(originalBtnHtml);
                    var errMsg = 'Unable to connect to WhatsApp right now. Please try again or call us directly.';
                    if (xhr && xhr.responseJSON && xhr.responseJSON.error) {
                        errMsg = xhr.responseJSON.error;
                    }
                    $('#waStatusMsg').addClass('error').text(errMsg).slideDown(200);
                });
        });

        // Handle Call Popup Submission
        var isCallSubmitting = false;
        $('#callLeadForm').off('submit').on('submit', function(e) {
            e.preventDefault();
            if (isCallSubmitting) return;

            var $nameInput = $('#callLeadName');
            var $phoneInput = $('#callLeadPhone');
            var name = ($nameInput.val() || '').trim();
            var phone = ($phoneInput.val() || '').trim();
            var cleanPhone = cleanPhoneNumber(phone);

            var hasError = false;

            if (name.length < 2) {
                $nameInput.addClass('is-invalid');
                $('#callNameError').slideDown(150);
                hasError = true;
            } else {
                $nameInput.removeClass('is-invalid');
                $('#callNameError').slideUp(150);
            }

            if (!isValidPhone(phone)) {
                $phoneInput.addClass('is-invalid');
                $('#callPhoneError').slideDown(150);
                hasError = true;
            } else {
                $phoneInput.removeClass('is-invalid');
                $('#callPhoneError').slideUp(150);
            }

            if (hasError) return;

            // Prepare Payload
            var payload = {
                name: name,
                fullName: name,
                phone: cleanPhone,
                number: cleanPhone,
                contact: cleanPhone,
                mobile: cleanPhone,
                buttonType: 'contact',
                type: 'contact',
                source: 'floating_call_popup',
                service: 'Direct Phone Call Advisory'
            };

            var $submitBtn = $('#callSubmitBtn');
            var originalBtnHtml = $submitBtn.html();
            isCallSubmitting = true;
            $submitBtn.prop('disabled', true).html('<i class="fa-solid fa-spinner fa-spin"></i> Submitting...');
            $('#callStatusMsg').slideUp(100).removeClass('success error').empty();

            submitLeadToAPI(payload)
                .done(function() {
                    $('#callStatusMsg')
                        .addClass('success')
                        .html('<i class="fa-solid fa-circle-check"></i> Details submitted successfully! Connecting your call...')
                        .slideDown(200);

                    // Show fallback direct button
                    $('#callDirectBtn').slideDown(200);
                    $('#callLeadForm').slideUp(200);

                    // Attempt automatic dial
                    setTimeout(function() {
                        window.location.href = 'tel:' + OJA_CONFIG.telNumber;
                    }, 500);
                })
                .fail(function(xhr) {
                    isCallSubmitting = false;
                    $submitBtn.prop('disabled', false).html(originalBtnHtml);
                    var errMsg = 'Unable to initiate call request. Please try again or dial ' + OJA_CONFIG.phone + '.';
                    if (xhr && xhr.responseJSON && xhr.responseJSON.error) {
                        errMsg = xhr.responseJSON.error;
                    }
                    $('#callStatusMsg').addClass('error').text(errMsg).slideDown(200);
                });
        });
    }

    /**
     * Connect all standard website forms (Contact form, Newsletter, etc.)
     */
    function initWebsiteForms() {
        // 1. Contact Form on contact.html
        var $contactForm = $('#contactForm');
        if ($contactForm.length) {
            // Remove any legacy action
            $contactForm.removeAttr('action');

            // Wire up submit event
            $contactForm.off('submit.ojaLeads').on('submit.ojaLeads', function(e) {
                // If bootstrap validator is active and has errors, don't submit
                if (e.isDefaultPrevented && e.isDefaultPrevented()) {
                    return;
                }

                e.preventDefault();

                var fname = ($('#fname').val() || '').trim();
                var lname = ($('#lname').val() || '').trim();
                var fullName = (fname + ' ' + lname).trim();
                var email = ($('#email').val() || '').trim();
                var phone = ($('#phone').val() || '').trim();
                var message = ($('#message').val() || '').trim();

                // Basic validation fallback
                if (!fname || !email || !phone) {
                    return;
                }

                var cleanPhone = cleanPhoneNumber(phone);

                var payload = {
                    name: fullName,
                    fullName: fullName,
                    fname: fname,
                    lname: lname,
                    email: email,
                    phone: cleanPhone || phone,
                    number: cleanPhone || phone,
                    contact: cleanPhone || phone,
                    mobile: cleanPhone || phone,
                    msg: message,
                    message: message,
                    comments: message,
                    subject: 'Website Contact Page Enquiry',
                    buttonType: 'form',
                    type: 'form',
                    source: 'contact_page_form'
                };

                var $submitBtn = $contactForm.find('button[type="submit"]');
                var originalBtnHtml = $submitBtn.html();
                $submitBtn.prop('disabled', true).html('<i class="fa-solid fa-spinner fa-spin"></i> Submitting...');

                var $msgSubmit = $('#msgSubmit');

                submitLeadToAPI(payload)
                    .done(function() {
                        $submitBtn.prop('disabled', false).html(originalBtnHtml);
                        $contactForm[0].reset();
                        $msgSubmit.removeClass('hidden text-danger').addClass('text-success').html('Thank you! Your enquiry has been received. Our team will contact you shortly.');
                    })
                    .fail(function(xhr) {
                        $submitBtn.prop('disabled', false).html(originalBtnHtml);
                        var errMsg = 'Unable to submit your message right now. Please try again or reach us at ' + OJA_CONFIG.phone + '.';
                        if (xhr && xhr.responseJSON && xhr.responseJSON.error) {
                            errMsg = xhr.responseJSON.error;
                        }
                        $msgSubmit.removeClass('hidden text-success').addClass('text-danger').html(errMsg);
                    });
            });
        }

        // 2. Newsletter Subscription Forms across all pages
        $('form#newslettersForm, .footer-newsletter-form-prime form').each(function() {
            var $nForm = $(this);
            $nForm.off('submit.ojaNewsletter').on('submit.ojaNewsletter', function(e) {
                e.preventDefault();
                var $mailInput = $nForm.find('input[name="mail"], input[type="email"]');
                var email = ($mailInput.val() || '').trim();
                if (!email) return;

                var $btn = $nForm.find('button[type="submit"]');
                var originalHtml = $btn.html();
                $btn.prop('disabled', true).html('<i class="fa-solid fa-spinner fa-spin"></i>');

                var payload = {
                    email: email,
                    name: 'Newsletter Subscriber',
                    service: 'Newsletter Subscription',
                    buttonType: 'form',
                    type: 'form',
                    source: 'footer_newsletter'
                };

                submitLeadToAPI(payload)
                    .done(function() {
                        $btn.prop('disabled', false).html(originalHtml);
                        $nForm[0].reset();
                        showToast('Thank you for subscribing to Oja Realty property updates!', 'success');
                    })
                    .fail(function(xhr) {
                        $btn.prop('disabled', false).html(originalHtml);
                        var errMsg = 'Subscription failed. Please check your email and try again.';
                        if (xhr && xhr.responseJSON && xhr.responseJSON.error) {
                            errMsg = xhr.responseJSON.error;
                        }
                        showToast(errMsg, 'error');
                    });
            });
        });
    }

    /**
     * Simple non-intrusive toast notification
     */
    function showToast(message, type) {
        var $toast = $('#ojaToast');
        if ($toast.length === 0) {
            $('body').append('<div id="ojaToast" class="oja-toast" style="display:none;"></div>');
            $toast = $('#ojaToast');
        }
        $toast.removeClass('success error')
              .addClass(type === 'error' ? 'error' : 'success')
              .html((type === 'error' ? '<i class="fa-solid fa-triangle-exclamation"></i> ' : '<i class="fa-solid fa-circle-check"></i> ') + message)
              .fadeIn(300);

        setTimeout(function() {
            $toast.fadeOut(400);
        }, 4000);
    }

    // Initialize on DOM ready
    $(document).ready(function() {
        initFloatingWidget();
        initWebsiteForms();
    });

})(jQuery);

