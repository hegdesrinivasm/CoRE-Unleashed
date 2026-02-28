import React, { useState, useEffect } from "react";
import backgroundImage from "../assets/background_desktop.png";
import logo from "../assets/core_logo.png";

/* ---------------- Constants ---------------- */
const COLORS = {
    primary: "#FFD6AC",
    secondary: "#ceab86",
    tertiary: "#A2886D",
    border: "#A2886D",
    error: "#ef4444",
    success: "#10b981",
    warning: "#fbbf24",
    gray: "#6b7280",
    darkGray: "#4b5563",
    lightGray: "#9ca3af"
};

const FONTS = {
    primary: "Poppins, sans-serif",
    secondary: "GomariceNoContinue, sans-serif"
};

const COMMON_STYLES = {
    transition: "all 0.3s ease",
    inputBase: {
        width: "100%",
        padding: "12px 16px",
        borderRadius: "10px",
        backgroundColor: "white",
        color: "black",
        outline: "none",
        fontSize: "15px",
        boxSizing: "border-box",
        fontFamily: FONTS.primary
    },
    selectBase: {
        cursor: "pointer",
        appearance: "none",
        backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23A2886D' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 12px center",
        backgroundSize: "20px",
        paddingRight: "40px"
    }
};

const VALIDATION = {
    email: (email) => /^[^\s@]+@gmail\.com$/.test(email.trim()),
    phone: (phone) => /^\d{10}$/.test(phone.trim()),
    name: (name) => /^[a-zA-Z\s'-]+$/.test(name.trim()),
    googleDrive: (url) => {
        const trimmed = url.trim();
        return trimmed !== '' && /^https?:\/\/(drive|docs)\.google\.com\/.+/.test(trimmed);
    },
    github: (url) => {
        const trimmed = url.trim();
        return trimmed === '' || /^https?:\/\/(www\.)?github\.com\/.+/.test(trimmed);
    }
};

/* ---------------- Utility Functions ---------------- */

// Create hover handlers for buttons
const createHoverHandlers = (hoverColor, defaultColor, extraEffect = {}) => ({
    onMouseEnter: (e) => {
        e.target.style.backgroundColor = hoverColor;
        if (extraEffect.transform) e.target.style.transform = extraEffect.transform;
    },
    onMouseLeave: (e) => {
        e.target.style.backgroundColor = defaultColor;
        if (extraEffect.transform) e.target.style.transform = 'scale(1)';
    }
});

// Get input border color based on validation
const getInputBorderColor = (value, isValid = true) => {
    if (!value) return COLORS.border;
    return isValid ? COLORS.success : COLORS.error;
};

// Common button base style
const getButtonStyle = (customStyles = {}) => ({
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontFamily: FONTS.primary,
    transition: COMMON_STYLES.transition,
    ...customStyles
});

// Common message styles
const errorMessageStyle = {
    color: COLORS.error,
    marginBottom: "16px",
    fontSize: "14px",
    fontFamily: FONTS.primary
};

const warningMessageStyle = {
    color: COLORS.warning,
    marginBottom: "16px",
    fontSize: "14px",
    fontFamily: FONTS.primary,
    textAlign: "center"
};

/* ---------------- View Components ---------------- */

// Already Submitted View Component (shown when user has completed registration)
function AlreadySubmittedView({ teamName, onReturnToLogin }) {
    return (
        <>
            <div style={{ textAlign: "center", padding: "20px 0" }}>
                <div
                    style={{
                        width: "80px",
                        height: "80px",
                        margin: "0 auto 24px",
                        borderRadius: "50%",
                        backgroundColor: COLORS.success,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "48px",
                        color: "white"
                    }}
                >
                    ✓
                </div>

                <h2 style={{
                    color: COLORS.primary,
                    fontSize: "28px",
                    fontWeight: "bold",
                    marginBottom: "16px",
                    fontFamily: FONTS.secondary,
                    letterSpacing: "1px"
                }}>
                    ALREADY SUBMITTED
                </h2>

                {teamName && (
                    <p style={{
                        color: COLORS.secondary,
                        fontSize: "16px",
                        marginBottom: "24px",
                        fontFamily: FONTS.primary
                    }}>
                        Team <strong style={{ color: COLORS.primary }}>{teamName}</strong> has been registered.
                    </p>
                )}

                <p style={{
                    color: COLORS.tertiary,
                    fontSize: "14px",
                    marginBottom: "32px",
                    fontFamily: FONTS.primary,
                    lineHeight: "1.8"
                }}>
                    Your registration has been successfully submitted.
                    <br />
                    Please wait for further updates.
                    <br />
                    You will be notified via email about the next steps.
                </p>

                <button
                    onClick={onReturnToLogin}
                    className="reg-button"
                    style={getButtonStyle({
                        width: "100%",
                        padding: "14px 32px",
                        backgroundColor: COLORS.primary,
                        color: "black",
                        fontSize: "16px",
                        fontWeight: "bold",
                        fontFamily: FONTS.secondary,
                        letterSpacing: "1px"
                    })}
                    {...createHoverHandlers(COLORS.secondary, COLORS.primary)}
                >
                    RETURN TO LOGIN
                </button>
            </div>
        </>
    );
}

// Step Progress Indicator Component
function StepIndicator({ currentStep }) {
    const steps = [
        { number: 1, label: "Team Name" },
        { number: 2, label: "Members" },
        { number: 3, label: "Review" },
        { number: 4, label: "Round 1" }
    ];

    const getCircleStyle = (step) => ({
        width: "36px",
        height: "36px",
        borderRadius: "50%",
        backgroundColor: currentStep === step ? COLORS.primary : currentStep > step ? COLORS.secondary : "transparent",
        border: `2px solid ${currentStep >= step ? COLORS.primary : COLORS.gray}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: currentStep === step ? "black" : currentStep > step ? "white" : COLORS.gray,
        fontWeight: "bold",
        fontSize: "14px",
        fontFamily: FONTS.primary,
        transition: COMMON_STYLES.transition
    });

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "32px", gap: "12px" }}>
            {steps.map((step, index) => (
                <React.Fragment key={step.number}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
                        <div style={getCircleStyle(step.number)} className="step-indicator-circle">
                            {currentStep > step.number ? "✓" : step.number}
                        </div>
                        <span style={{
                            fontSize: "11px",
                            color: currentStep >= step.number ? COLORS.secondary : COLORS.gray,
                            fontFamily: FONTS.primary,
                            fontWeight: currentStep === step.number ? "600" : "400"
                        }} className="step-indicator-label">
                            {step.label}
                        </span>
                    </div>
                    {index < steps.length - 1 && (
                        <div style={{
                            width: "40px",
                            height: "2px",
                            backgroundColor: currentStep > step.number ? COLORS.secondary : COLORS.gray,
                            marginBottom: "20px",
                            transition: COMMON_STYLES.transition
                        }} className="step-indicator-line" />
                    )}
                </React.Fragment>
            ))}
        </div>
    );
}

function TeamNameView({ teamName, setTeamName, onNext }) {
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && teamName) onNext();
    };

    return (
        <>
            <StepIndicator currentStep={1} />
            <h1 className="reg-title" style={{
                color: COLORS.secondary,
                fontSize: "32px",
                fontWeight: "bold",
                marginBottom: "40px",
                textAlign: "center",
                letterSpacing: "2px",
                fontFamily: FONTS.secondary
            }}>
                TEAM REGISTRATION
            </h1>
            <input
                type="text"
                placeholder="Enter Team Name"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                onKeyPress={handleKeyPress}
                maxLength={50}
                className="reg-input"
                style={{
                    ...COMMON_STYLES.inputBase,
                    padding: "16px 20px",
                    marginBottom: "24px",
                    border: `2px solid ${COLORS.border}`,
                    fontSize: "16px"
                }}
            />
            <button
                onClick={onNext}
                className="reg-button"
                style={{
                    width: "100%",
                    padding: "16px",
                    fontSize: "24px",
                    fontWeight: "bold",
                    border: "none",
                    borderRadius: "10px",
                    backgroundColor: COLORS.primary,
                    color: "black",
                    cursor: teamName ? "pointer" : "not-allowed",
                    fontFamily: FONTS.secondary,
                    letterSpacing: "2px",
                    opacity: teamName ? 1 : 0.6
                }}
                disabled={!teamName}
            >
                NEXT
            </button>
        </>
    );
}

function MemberWizardView({
    member,
    memberIndex,
    totalMembers,
    updateMember,
    onPrevious,
    onAddMember,
    onNext,
    onNavigateToMember,
    onRemoveMember,
    canAddMember,
    canProceedToSummary,
    hasDuplicateEmails,
    hasDuplicatePhones,
    allMembers
}) {
    const [touchedFields, setTouchedFields] = React.useState({ name: false, email: false, phone: false });
    const [activeField, setActiveField] = React.useState(null);

    const isCurrentMemberFilled = member.name && member.email && member.phone && member.degree && member.year &&
        (member.degree === 'BCA' || member.degree === 'MCA' || member.branch) && member.college;
    const isValidEmail = !member.email || VALIDATION.email(member.email);
    const isValidPhone = !member.phone || VALIDATION.phone(member.phone);
    const isValidName = !member.name || VALIDATION.name(member.name);

    const handleFocus = (fieldName) => setActiveField(fieldName);
    const handleBlur = (fieldName) => {
        setTouchedFields(prev => ({ ...prev, [fieldName]: true }));
        setActiveField(null);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            if (canProceedToSummary) {
                onNext();
            } else if (canAddMember && isCurrentMemberFilled && isValidEmail && isValidPhone && isValidName) {
                onAddMember();
            }
        }
    };

    return (
        <>
            <StepIndicator currentStep={2} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
                <h2 className="reg-title" style={{
                    color: COLORS.secondary,
                    fontSize: "28px",
                    fontWeight: "bold",
                    margin: 0,
                    fontFamily: FONTS.secondary,
                    letterSpacing: "1px"
                }}>
                    {memberIndex === 0 ? "Team Leader" : `Member ${memberIndex + 1}`} ({memberIndex + 1}/{totalMembers})
                </h2>
                {memberIndex !== 0 && totalMembers > 2 && (
                    <button
                        onClick={() => {
                            if (window.confirm(`Are you sure you want to remove ${member.name || 'this member'}?`)) {
                                onRemoveMember(memberIndex);
                            }
                        }}
                        className="remove-button"
                        style={getButtonStyle({
                            padding: "8px 16px",
                            backgroundColor: COLORS.error,
                            color: "white",
                            borderRadius: "8px",
                            fontSize: "14px",
                            fontWeight: "600"
                        })}
                        {...createHoverHandlers("#dc2626", COLORS.error)}
                    >
                        Remove
                    </button>
                )}
            </div>

            {totalMembers > 1 && (
                <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginBottom: "20px", flexWrap: "wrap" }}>
                    {allMembers.map((m, index) => {
                        const isFilled = m.name && m.email && m.phone && m.degree && m.year &&
                            (m.degree === 'BCA' || m.degree === 'MCA' || m.branch) && m.college;
                        const isActive = index === memberIndex;
                        return (
                            <button
                                key={index}
                                onClick={() => onNavigateToMember(index)}
                                className="member-nav-circle"
                                style={{
                                    width: "40px",
                                    height: "40px",
                                    borderRadius: "50%",
                                    border: `${isActive ? "3px" : "2px"} solid ${isActive ? COLORS.primary : COLORS.border}`,
                                    backgroundColor: isActive ? COLORS.primary : isFilled ? COLORS.secondary : "transparent",
                                    color: isActive ? "black" : COLORS.secondary,
                                    cursor: "pointer",
                                    fontSize: "14px",
                                    fontWeight: "bold",
                                    fontFamily: FONTS.primary,
                                    transition: COMMON_STYLES.transition,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    padding: 0
                                }}
                            >
                                {index === 0 ? "L" : index + 1}
                            </button>
                        );
                    })}
                </div>
            )}

            <div className="reg-member-card" style={{ marginBottom: "24px", padding: "16px", border: `2px solid ${COLORS.border}`, borderRadius: "10px" }}>
                <input
                    type="text"
                    placeholder="Full Name"
                    value={member.name}
                    onChange={(e) => updateMember(memberIndex, "name", e.target.value)}
                    onFocus={() => handleFocus('name')}
                    onBlur={() => handleBlur('name')}
                    onKeyPress={handleKeyPress}
                    maxLength={50}
                    className="reg-input"
                    style={{ ...COMMON_STYLES.inputBase, marginBottom: "12px", border: `2px solid ${getInputBorderColor(member.name, isValidName)}`, transition: "border-color 0.3s ease" }}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={member.email}
                    onChange={(e) => updateMember(memberIndex, "email", e.target.value)}
                    onFocus={() => handleFocus('email')}
                    onBlur={() => handleBlur('email')}
                    onKeyPress={handleKeyPress}
                    maxLength={100}
                    className="reg-input"
                    style={{ ...COMMON_STYLES.inputBase, marginBottom: "12px", border: `2px solid ${getInputBorderColor(member.email, isValidEmail)}`, transition: "border-color 0.3s ease" }}
                />
                <input
                    type="tel"
                    placeholder="Phone Number"
                    value={member.phone}
                    onChange={(e) => updateMember(memberIndex, "phone", e.target.value)}
                    onFocus={() => handleFocus('phone')}
                    onBlur={() => handleBlur('phone')}
                    onKeyPress={handleKeyPress}
                    maxLength={15}
                    className="reg-input"
                    style={{ ...COMMON_STYLES.inputBase, marginBottom: "12px", border: `2px solid ${getInputBorderColor(member.phone, isValidPhone)}`, transition: "border-color 0.3s ease" }}
                />

                <select
                    value={member.degree}
                    onChange={(e) => updateMember(memberIndex, "degree", e.target.value)}
                    className="reg-input"
                    style={{ ...COMMON_STYLES.inputBase, ...COMMON_STYLES.selectBase, marginBottom: "12px", border: `2px solid ${COLORS.border}`, color: member.degree ? "black" : "#999", transition: "border-color 0.3s ease" }}
                >
                    <option value="" disabled style={{ color: "#999" }}>Select Degree/Program</option>
                    <option value="B.E." style={{ color: "black" }}>B.E. (Bachelor of Engineering)</option>
                    <option value="BCA" style={{ color: "black" }}>BCA (Bachelor of Computer Applications)</option>
                    <option value="MCA" style={{ color: "black" }}>MCA (Master of Computer Applications)</option>
                </select>

                <select
                    value={member.year}
                    onChange={(e) => updateMember(memberIndex, "year", e.target.value)}
                    className="reg-input"
                    style={{ ...COMMON_STYLES.inputBase, ...COMMON_STYLES.selectBase, marginBottom: "12px", border: `2px solid ${COLORS.border}`, color: member.year ? "black" : "#999", transition: "border-color 0.3s ease" }}
                >
                    <option value="" disabled style={{ color: "#999" }}>Select Year</option>
                    <option value="1" style={{ color: "black" }}>1st Year</option>
                    <option value="2" style={{ color: "black" }}>2nd Year</option>
                    {member.degree !== "MCA" && (
                        <option value="3" style={{ color: "black" }}>3rd Year</option>
                    )}
                    {member.degree === "B.E." && (
                        <option value="4" style={{ color: "black" }}>4th Year</option>
                    )}
                </select>

                <select
                    value={member.branch}
                    onChange={(e) => updateMember(memberIndex, "branch", e.target.value)}
                    disabled={member.degree === 'BCA' || member.degree === 'MCA'}
                    className="reg-input"
                    style={{
                        ...COMMON_STYLES.inputBase,
                        ...COMMON_STYLES.selectBase,
                        marginBottom: "12px",
                        border: `2px solid ${COLORS.border}`,
                        color: member.branch ? "black" : "#999",
                        transition: "border-color 0.3s ease",
                        cursor: (member.degree === 'BCA' || member.degree === 'MCA') ? "not-allowed" : "pointer",
                        opacity: (member.degree === 'BCA' || member.degree === 'MCA') ? 0.6 : 1
                    }}
                >
                    {(member.degree === 'BCA' || member.degree === 'MCA') ? (
                        <option value="N/A" style={{ color: "black" }}>Not Applicable</option>
                    ) : (
                        <>
                            <option value="" disabled style={{ color: "#999" }}>Select Branch</option>
                            <option value="Computer Science Engineering (CSE)" style={{ color: "black" }}>Computer Science Engineering (CSE)</option>
                            <option value="Information Technology (IT)" style={{ color: "black" }}>Information Technology (IT)</option>
                            <option value="Information Science Engineering (ISE)" style={{ color: "black" }}>Information Science Engineering (ISE)</option>
                            <option value="Artificial Intelligence & Machine Learning (AI/ML)" style={{ color: "black" }}>Artificial Intelligence & Machine Learning (AI/ML)</option>
                            <option value="Data Science" style={{ color: "black" }}>Data Science</option>
                            <option value="Computer Science & Design" style={{ color: "black" }}>Computer Science & Design</option>
                            <option value="Computer Science & Engineering (Cyber Security)" style={{ color: "black" }}>Computer Science & Engineering (Cyber Security)</option>
                            <option value="Electronics & Communication Engineering" style={{ color: "black" }}>Electronics & Communication Engineering</option>
                        </>
                    )}
                </select>

                <input
                    type="text"
                    placeholder="College Name"
                    value={member.college}
                    onChange={(e) => updateMember(memberIndex, "college", e.target.value)}
                    onKeyPress={handleKeyPress}
                    maxLength={100}
                    className="reg-input"
                    style={{ ...COMMON_STYLES.inputBase, border: `2px solid ${getInputBorderColor(member.college)}`, transition: "border-color 0.3s ease" }}
                />
            </div>

            {!isValidEmail && member.email && touchedFields.email && activeField !== 'email' && (
                <p style={errorMessageStyle}>
                    Email must be in the format: username@gmail.com
                </p>
            )}
            {!isValidPhone && member.phone && touchedFields.phone && activeField !== 'phone' && (
                <p style={errorMessageStyle}>
                    Phone number must be exactly 10 digits
                </p>
            )}
            {!isValidName && member.name && touchedFields.name && activeField !== 'name' && (
                <p style={errorMessageStyle}>
                    Name can only contain letters, spaces, hyphens, and apostrophes
                </p>
            )}
            {hasDuplicateEmails() && (
                <p style={errorMessageStyle}>
                    Email already used by another member.
                </p>
            )}
            {hasDuplicatePhones() && (
                <p style={errorMessageStyle}>
                    Phone number already used by another member.
                </p>
            )}
            {!isCurrentMemberFilled && (
                <p style={warningMessageStyle}>
                    Please fill all fields to continue
                </p>
            )}

            <div style={{ display: "flex", justifyContent: "space-between", gap: "16px", marginBottom: "16px" }}>
                <button onClick={onPrevious} className="reg-button" style={{
                    width: "50%", padding: "12px", backgroundColor: COLORS.gray, color: "white",
                    border: "none", borderRadius: "10px", cursor: "pointer", fontSize: "16px",
                    fontWeight: "600", fontFamily: FONTS.primary
                }}>
                    Previous
                </button>
                {canAddMember && (
                    <button
                        onClick={onAddMember}
                        disabled={!isCurrentMemberFilled || !isValidEmail || !isValidPhone || !isValidName}
                        className="reg-button"
                        style={{
                            width: "50%", padding: "12px",
                            backgroundColor: (isCurrentMemberFilled && isValidEmail && isValidPhone && isValidName) ? COLORS.primary : COLORS.darkGray,
                            color: (isCurrentMemberFilled && isValidEmail && isValidPhone && isValidName) ? "black" : "white",
                            border: "none", borderRadius: "10px",
                            cursor: (isCurrentMemberFilled && isValidEmail && isValidPhone && isValidName) ? "pointer" : "not-allowed",
                            fontSize: "16px", fontWeight: "600", fontFamily: FONTS.primary
                        }}
                    >
                        Add Member
                    </button>
                )}
            </div>
            {canProceedToSummary && (
                <button onClick={onNext} className="reg-button" style={{
                    width: "100%", padding: "16px", fontSize: "24px", fontWeight: "bold",
                    border: "none", borderRadius: "10px", backgroundColor: COLORS.primary,
                    color: "black", cursor: "pointer", fontFamily: FONTS.secondary, letterSpacing: "2px"
                }}>
                    REVIEW & SUBMIT
                </button>
            )}
        </>
    );
}

function SummaryView({
    teamName,
    members,
    error,
    loading,
    onPrevious,
    onNext,
    onEditMember
}) {
    const canProceed = !loading;
    return (
        <>
            <StepIndicator currentStep={3} />
            <h2 className="reg-title" style={{
                color: COLORS.secondary, fontSize: "28px", fontWeight: "bold",
                marginBottom: "24px", textAlign: "center", fontFamily: FONTS.secondary, letterSpacing: "1px"
            }}>
                Review Your Team
            </h2>
            <p style={{ color: "white", marginBottom: "16px", fontSize: "16px", fontFamily: FONTS.primary }}>
                <strong>Team Name:</strong> {teamName}
            </p>
            {error && (
                <p style={{ ...errorMessageStyle, textAlign: "center" }}>
                    {error}
                </p>
            )}

            {members.map((member, index) => (
                <div key={index} className="reg-member-card" style={{ marginBottom: "16px", padding: "16px", border: `2px solid ${COLORS.border}`, borderRadius: "10px", color: "white", position: "relative" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                        <h3 style={{ fontWeight: "600", fontSize: "16px", fontFamily: FONTS.primary, margin: 0 }}>
                            {index === 0 ? "Leader" : `Member ${index + 1}`}
                        </h3>
                        <button
                            onClick={() => onEditMember(index)}
                            className="edit-button"
                            style={getButtonStyle({ padding: "6px 14px", backgroundColor: COLORS.primary, color: "black", borderRadius: "6px", fontSize: "12px", fontWeight: "600" })}
                            {...createHoverHandlers(COLORS.secondary, COLORS.primary)}
                        >
                            Edit
                        </button>
                    </div>
                    {[['Name', member.name], ['Email', member.email], ['Phone', member.phone], ['Degree', member.degree], ['Year', member.year], ['Branch', member.branch], ['College', member.college]].map(([label, value], i) => (
                        <p key={i} style={{ marginBottom: i === 6 ? "0" : "4px", fontSize: "14px", fontFamily: FONTS.primary }}>
                            {label}: {value}
                        </p>
                    ))}
                </div>
            ))}

            <div style={{ display: "flex", gap: "16px", marginTop: "24px" }}>
                <button onClick={onPrevious} className="reg-button" style={{ width: "50%", padding: "12px", backgroundColor: COLORS.gray, color: "white", border: "none", borderRadius: "10px", cursor: "pointer", fontSize: "16px", fontWeight: "600", fontFamily: FONTS.primary }}>
                    Previous
                </button>
                <button
                    onClick={onNext}
                    disabled={!canProceed}
                    className="reg-button"
                    style={{
                        width: "50%", padding: "16px",
                        backgroundColor: (!canProceed) ? COLORS.lightGray : COLORS.primary,
                        color: (!canProceed) ? COLORS.gray : "black",
                        border: "none", borderRadius: "10px",
                        cursor: (!canProceed) ? "not-allowed" : "pointer",
                        fontSize: "20px", fontWeight: "bold", fontFamily: FONTS.secondary, letterSpacing: "1px"
                    }}
                >
                    {loading ? "LOADING..." : "NEXT"}
                </button>
            </div>
        </>
    );
}

function Round1SubmissionView({
    googleDriveLink,
    setGoogleDriveLink,
    githubRepoLink,
    setGithubRepoLink,
    onPrevious,
    onSubmit,
    loading,
    error,
    successMessage
}) {
    const [touchedLinks, setTouchedLinks] = React.useState({ googleDrive: false, github: false });

    const isValidGoogleDrive = VALIDATION.googleDrive(googleDriveLink);
    const isValidGithub = VALIDATION.github(githubRepoLink);
    const canSubmit = isValidGoogleDrive && isValidGithub && !loading;

    return (
        <>
            <StepIndicator currentStep={4} />
            <h2 className="reg-title" style={{
                color: COLORS.secondary, fontSize: "28px", fontWeight: "bold",
                marginBottom: "16px", textAlign: "center", fontFamily: FONTS.secondary, letterSpacing: "1px"
            }}>
                Round 1 Submission
            </h2>
            <p style={{ color: COLORS.lightGray, fontSize: "14px", marginBottom: "24px", textAlign: "center", fontFamily: FONTS.primary, lineHeight: "1.6" }}>
                Submit your project links to complete your team registration.
                <br />
                <span style={{ color: COLORS.warning }}>Google Drive PPT link is required for registration.</span>
            </p>

            {error && (
                <p style={{ ...errorMessageStyle, textAlign: "center" }}>
                    {error}
                </p>
            )}

            {successMessage && (
                <div style={{ padding: "16px", marginBottom: "20px", backgroundColor: "rgba(16, 185, 129, 0.1)", border: `2px solid ${COLORS.success}`, borderRadius: "10px" }}>
                    <p style={{ color: COLORS.success, fontSize: "14px", fontFamily: FONTS.primary, margin: 0, textAlign: "center" }}>
                        ✓ {successMessage}
                    </p>
                </div>
            )}

            <div style={{ marginBottom: "24px", padding: "20px", border: `2px solid ${COLORS.border}`, borderRadius: "10px", backgroundColor: "rgba(206, 171, 134, 0.1)" }}>
                <h3 style={{ color: COLORS.primary, fontSize: "20px", fontWeight: "bold", marginBottom: "16px", fontFamily: FONTS.secondary, letterSpacing: "0.5px" }}>
                    PROJECT SUBMISSION
                </h3>

                <div style={{ marginBottom: "16px" }}>
                    <label style={{ display: "block", color: COLORS.secondary, fontSize: "14px", marginBottom: "8px", fontFamily: FONTS.primary, fontWeight: "500" }}>
                        Google Drive PPT Link <span style={{ color: COLORS.error }}>*</span>
                    </label>
                    <input
                        type="url"
                        placeholder="https://drive.google.com/..."
                        value={googleDriveLink}
                        onChange={(e) => setGoogleDriveLink(e.target.value)}
                        onBlur={() => setTouchedLinks(prev => ({ ...prev, googleDrive: true }))}
                        className="reg-input"
                        style={{
                            ...COMMON_STYLES.inputBase,
                            border: `2px solid ${googleDriveLink && touchedLinks.googleDrive ? (isValidGoogleDrive ? COLORS.success : COLORS.error) : COLORS.border}`,
                            transition: "border-color 0.3s ease"
                        }}
                    />
                    {touchedLinks.googleDrive && !isValidGoogleDrive && (
                        <p style={{ color: COLORS.error, marginTop: "6px", fontSize: "12px", fontFamily: FONTS.primary }}>
                            {googleDriveLink.trim() === '' ? 'Google Drive PPT link is required' : 'Please enter a valid Google Drive or Google Docs link'}
                        </p>
                    )}
                </div>

                <div style={{ marginBottom: "16px" }}>
                    <label style={{ display: "block", color: COLORS.secondary, fontSize: "14px", marginBottom: "8px", fontFamily: FONTS.primary, fontWeight: "500" }}>
                        GitHub Repository Link <span style={{ color: COLORS.lightGray, fontWeight: "400" }}>(Optional)</span>
                    </label>
                    <input
                        type="url"
                        placeholder="https://github.com/..."
                        value={githubRepoLink}
                        onChange={(e) => setGithubRepoLink(e.target.value)}
                        onBlur={() => setTouchedLinks(prev => ({ ...prev, github: true }))}
                        className="reg-input"
                        style={{
                            ...COMMON_STYLES.inputBase,
                            border: `2px solid ${githubRepoLink && touchedLinks.github ? (isValidGithub ? COLORS.success : COLORS.error) : COLORS.border}`,
                            transition: "border-color 0.3s ease"
                        }}
                    />
                    {githubRepoLink && touchedLinks.github && !isValidGithub && (
                        <p style={{ color: COLORS.error, marginTop: "6px", fontSize: "12px", fontFamily: FONTS.primary }}>
                            Please enter a valid GitHub repository link
                        </p>
                    )}
                </div>
            </div>

            <div style={{ display: "flex", gap: "16px", marginBottom: "12px" }}>
                <button
                    onClick={onPrevious}
                    disabled={loading}
                    className="reg-button"
                    style={getButtonStyle({
                        width: "50%",
                        padding: "12px",
                        backgroundColor: loading ? COLORS.darkGray : COLORS.gray,
                        color: "white",
                        fontSize: "16px",
                        fontWeight: "600",
                        cursor: loading ? "not-allowed" : "pointer"
                    })}
                >
                    Previous
                </button>
                <button
                    onClick={onSubmit}
                    disabled={!canSubmit}
                    className="reg-button"
                    style={getButtonStyle({
                        width: "50%",
                        padding: "12px",
                        backgroundColor: (!canSubmit) ? COLORS.darkGray : COLORS.primary,
                        color: (!canSubmit) ? "white" : "black",
                        fontSize: "16px",
                        fontWeight: "bold",
                        fontFamily: FONTS.secondary,
                        cursor: (!canSubmit) ? "not-allowed" : "pointer",
                        letterSpacing: "1px"
                    })}
                    {...(!canSubmit ? {} : createHoverHandlers(COLORS.secondary, COLORS.primary))}
                >
                    {loading ? "REGISTERING..." : "REGISTER TEAM"}
                </button>
            </div>
        </>
    );
}

export default function Registration() {
    const [step, setStep] = useState(1);
    const [teamName, setTeamName] = useState("");
    const [members, setMembers] = useState([
        { name: "", email: "", phone: "", degree: "", year: "", branch: "", college: "" },
    ]);
    const [currentMemberIndex, setCurrentMemberIndex] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const [googleDriveLink, setGoogleDriveLink] = useState("");
    const [githubRepoLink, setGithubRepoLink] = useState("");
    const [round1SubmissionSuccess, setRound1SubmissionSuccess] = useState("");
    const [registrationStatus, setRegistrationStatus] = useState(null); // null = initial, 'checking' | 'completed' | 'not-registered'
    const [userEmail, setUserEmail] = useState(""); // User's email from login

    /* ---------------- LocalStorage Persistence ---------------- */

    // Check backend registration status on mount (if user logged in)
    useEffect(() => {
        const checkBackendStatus = async () => {
            try {
                // Check if user is logged in (email stored after login)
                const loggedInUserEmail = localStorage.getItem('userEmail');

                if (loggedInUserEmail) {
                    setUserEmail(loggedInUserEmail);
                    setRegistrationStatus('checking');

                    // Check backend to see if this user has completed registration
                    // Simulate API call 
                    // TODO: Replace with actual backend call
                    // const response = await fetch(`/api/teams/check-registration/${loggedInUserEmail}`);
                    // const data = await response.json();
                    // if (data.isRegistered) {
                    //     setRegistrationStatus('completed');
                    //     setTeamName(data.teamName || '');
                    // } else {
                    //     setRegistrationStatus('not-registered');
                    //     loadFromLocalStorage();
                    // }

                    // Mock: Set to false for normal registration flow, true to test "Already Submitted" view
                    const mockRegistrationCompleted = false;

                    await new Promise(resolve => setTimeout(resolve, 800));

                    if (mockRegistrationCompleted) {
                        setRegistrationStatus('completed');
                        setTeamName('Mock Team Name'); // Mock data for testing
                    } else {
                        setRegistrationStatus('not-registered');
                        loadFromLocalStorage();
                    }
                } else {
                    // No user logged in - load localStorage draft data immediately
                    loadFromLocalStorage();
                    setRegistrationStatus('not-registered');
                }
            } catch (err) {
                console.error('Failed to check registration status:', err);
                // On error, fallback to localStorage
                loadFromLocalStorage();
                setRegistrationStatus('not-registered');
            }
        };

        const loadFromLocalStorage = () => {
            try {
                const savedData = localStorage.getItem('teamRegistrationData');
                if (!savedData) return;

                const parsed = JSON.parse(savedData);
                if (parsed.teamName) setTeamName(parsed.teamName);
                if (parsed.members?.length > 0) setMembers(parsed.members);
                if (parsed.step) setStep(parsed.step);
                if (parsed.currentMemberIndex !== undefined) setCurrentMemberIndex(parsed.currentMemberIndex);
                if (parsed.googleDriveLink) setGoogleDriveLink(parsed.googleDriveLink);
                if (parsed.githubRepoLink) setGithubRepoLink(parsed.githubRepoLink);
            } catch (err) {
                console.error('Failed to load saved data:', err);
            }
        };

        checkBackendStatus();
    }, []);

    // Auto-save to localStorage on changes
    useEffect(() => {
        // Only save if registration not completed and user is in registration flow
        if (registrationSuccess || registrationStatus === 'completed') return;

        try {
            const dataToSave = {
                teamName,
                members,
                step,
                currentMemberIndex,
                googleDriveLink,
                githubRepoLink,
                timestamp: Date.now()
            };
            localStorage.setItem('teamRegistrationData', JSON.stringify(dataToSave));
        } catch (err) {
            console.error('Failed to save data:', err);
        }
    }, [teamName, members, step, currentMemberIndex, googleDriveLink, githubRepoLink, registrationSuccess, registrationStatus]);

    const clearSavedData = () => {
        try {
            localStorage.removeItem('teamRegistrationData');
        } catch (err) {
            console.error('Failed to clear saved data:', err);
        }
    };

    // Browser close warning - prevent data loss
    useEffect(() => {
        const hasData = teamName || members.some(m => m.name || m.email || m.phone || m.degree || m.branch || m.college);

        const handleBeforeUnload = (e) => {
            if (hasData && !registrationSuccess) {
                e.preventDefault();
                e.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
                return e.returnValue;
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [teamName, members, registrationSuccess]);

    /* ---------------- Utility Functions ---------------- */

    const addMember = () => {
        if (members.length < 4) {
            const newMembers = [
                ...members,
                { name: "", email: "", phone: "", degree: "", year: "", branch: "", college: "" },
            ];
            setMembers(newMembers);
            setCurrentMemberIndex(newMembers.length - 1);
        }
    };

    const navigateToPreviousMember = () => {
        if (currentMemberIndex > 0) {
            setCurrentMemberIndex(currentMemberIndex - 1);
        } else {
            setStep(1);
        }
    };

    const removeMember = (index) => {
        if (index !== 0 && members.length > 1) {
            const newMembers = members.filter((_, i) => i !== index);
            setMembers(newMembers);
            // Adjust currentMemberIndex if needed
            if (currentMemberIndex >= newMembers.length) {
                setCurrentMemberIndex(newMembers.length - 1);
            }
        }
    };

    const updateMember = (index, field, value) => {
        const updated = [...members];
        updated[index][field] = typeof value === 'string' ? value.trim() : value;

        // Auto-set branch to "N/A" for BCA/MCA students
        if (field === 'degree' && (value === 'BCA' || value === 'MCA')) {
            updated[index]['branch'] = 'N/A';
        }
        // Clear branch if switching back to B.E.
        if (field === 'degree' && value === 'B.E.' && updated[index]['branch'] === 'N/A') {
            updated[index]['branch'] = '';
        }

        setMembers(updated);
    };

    const hasDuplicates = (field) => {
        const values = members.map(m => m[field].trim()).filter(v => v !== "");
        return new Set(values).size !== values.length;
    };

    const hasDuplicateEmails = () => hasDuplicates('email');
    const hasDuplicatePhones = () => hasDuplicates('phone');

    const allEmailsValid = () => members.every(m => !m.email || VALIDATION.email(m.email));
    const allPhonesValid = () => members.every(m => !m.phone || VALIDATION.phone(m.phone));
    const allFieldsFilled = () => members.every(m => m.name && m.email && m.phone && m.degree && m.year &&
        (m.degree === 'BCA' || m.degree === 'MCA' || m.branch) && m.college);

    const canProceedToSummary =
        teamName &&
        members.length >= 2 &&
        !hasDuplicateEmails() &&
        !hasDuplicatePhones() &&
        allFieldsFilled() &&
        allEmailsValid() &&
        allPhonesValid();

    const handleRegistration = async (driveLink, githubLink) => {
        setLoading(true);
        setError('');
        setRound1SubmissionSuccess('');

        try {
            // TODO: Replace with actual backend call
            // const response = await fetch('/api/teams/register', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ 
            //         teamName, 
            //         members,
            //         googleDriveLink: driveLink.trim(),
            //         githubRepoLink: githubLink.trim()
            //     })
            // });
            // const data = await response.json();
            // if (response.ok) {
            //     clearSavedData();
            //     setRound1SubmissionSuccess('Registration successful! Your team has been registered.');
            //     setTimeout(() => setRegistrationSuccess(true), 800);
            // } else {
            //     setError(data.message || 'Registration failed');
            // }

            // Mock: Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            const mockSuccess = true; // Set to false to test error handling

            if (mockSuccess) {
                clearSavedData();
                setRound1SubmissionSuccess('Registration successful! Your team has been registered.');
                setTimeout(() => setRegistrationSuccess(true), 800);
            } else {
                setError('Registration failed. Please try again.');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
            console.error('Registration error:', err);
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        clearSavedData();
        setTeamName("");
        setMembers([{ name: "", email: "", phone: "", degree: "", year: "", branch: "", college: "" }]);
        setStep(1);
        setCurrentMemberIndex(0);
        setGoogleDriveLink("");
        setGithubRepoLink("");
        setError('');
        setRound1SubmissionSuccess("");
        setRegistrationSuccess(false);
    };



    /* ---------------- View Renderer ---------------- */

    const renderView = () => {
        // Show loading spinner while checking backend registration status (only when logged in)
        if (registrationStatus === 'checking') {
            return (
                <div style={{ textAlign: "center", padding: "40px 0" }}>
                    <div style={{
                        color: COLORS.secondary,
                        fontSize: "18px",
                        fontFamily: FONTS.primary,
                        marginBottom: "20px"
                    }}>
                        Checking registration status...
                    </div>
                    <div style={{
                        width: "40px",
                        height: "40px",
                        border: `4px solid ${COLORS.border}`,
                        borderTop: `4px solid ${COLORS.primary}`,
                        borderRadius: "50%",
                        margin: "0 auto",
                        animation: "spin 1s linear infinite"
                    }}></div>
                </div>
            );
        }

        // Show "Already Submitted" view if user has completed registration (in backend)
        if (registrationStatus === 'completed') {
            return (
                <AlreadySubmittedView
                    teamName={teamName}
                    onReturnToLogin={() => {
                        // Clear user session and return to login
                        localStorage.removeItem('userEmail');
                        window.location.href = '/'; // Adjust path as needed
                    }}
                />
            );
        }

        // Normal registration flow (registrationStatus === 'not-registered' or null on first render)
        switch (step) {
            case 1:
                return (
                    <TeamNameView
                        teamName={teamName}
                        setTeamName={setTeamName}
                        onNext={() => {
                            if (teamName) {
                                setStep(2);
                                setCurrentMemberIndex(0);
                            }
                        }}
                    />
                );
            case 2:
                return (
                    <MemberWizardView
                        member={members[currentMemberIndex]}
                        memberIndex={currentMemberIndex}
                        totalMembers={members.length}
                        updateMember={updateMember}
                        onPrevious={navigateToPreviousMember}
                        onAddMember={addMember}
                        onNext={() => setStep(3)}
                        onNavigateToMember={setCurrentMemberIndex}
                        onRemoveMember={removeMember}
                        canAddMember={members.length < 4}
                        canProceedToSummary={canProceedToSummary}
                        hasDuplicateEmails={hasDuplicateEmails}
                        hasDuplicatePhones={hasDuplicatePhones}
                        allMembers={members}
                    />
                );
            case 3:
                return (
                    <SummaryView
                        teamName={teamName}
                        members={members}
                        error={error}
                        loading={loading}
                        onPrevious={() => {
                            setStep(2);
                            setCurrentMemberIndex(members.length - 1);
                        }}
                        onNext={() => setStep(4)}
                        onEditMember={(index) => {
                            setStep(2);
                            setCurrentMemberIndex(index);
                        }}
                    />
                );
            case 4:
                return (
                    <Round1SubmissionView
                        googleDriveLink={googleDriveLink}
                        setGoogleDriveLink={setGoogleDriveLink}
                        githubRepoLink={githubRepoLink}
                        setGithubRepoLink={setGithubRepoLink}
                        onPrevious={() => setStep(3)}
                        onSubmit={() => handleRegistration(googleDriveLink, githubRepoLink)}
                        loading={loading}
                        error={error}
                        successMessage={round1SubmissionSuccess}
                    />
                );
            default:
                return (
                    <TeamNameView
                        teamName={teamName}
                        setTeamName={setTeamName}
                        onNext={() => {
                            if (teamName) {
                                setStep(2);
                                setCurrentMemberIndex(0);
                            }
                        }}
                    />
                );
        }
    };

    /* ---------------- Main UI ---------------- */

    return (
        <>
            <style>{`
                @media (max-width: 768px) {
                    .reg-logo {
                        width: 120px !important;
                        height: 120px !important;
                        top: 16px !important;
                        right: 16px !important;
                    }
                    .reg-box {
                        width: 85% !important;
                        max-width: none !important;
                        padding: 30px 28px !important;
                    }
                    .reg-title {
                        font-size: 22px !important;
                        margin-bottom: 30px !important;
                    }
                    .reg-input {
                        padding: 12px 16px !important;
                        font-size: 14px !important;
                    }
                    .reg-button {
                        padding: 12px !important;
                        font-size: 18px !important;
                    }
                    .step-indicator-circle {
                        width: 32px !important;
                        height: 32px !important;
                        font-size: 12px !important;
                    }
                    .step-indicator-label {
                        font-size: 10px !important;
                    }
                    .step-indicator-line {
                        width: 30px !important;
                    }
                    .member-nav-circle {
                        width: 36px !important;
                        height: 36px !important;
                        font-size: 13px !important;
                    }
                    .remove-button {
                        padding: 6px 12px !important;
                        font-size: 12px !important;
                    }
                    .edit-button {
                        padding: 8px 16px !important;
                        font-size: 14px !important;
                    }
                    .success-icon {
                        width: 70px !important;
                        height: 70px !important;
                        font-size: 42px !important;
                    }
                    .success-title {
                        font-size: 28px !important;
                    }
                    .success-text {
                        font-size: 16px !important;
                    }
                }
                @media (max-width: 480px) {
                    .reg-logo {
                        width: 70px !important;
                        height: 70px !important;
                        top: 10px !important;
                        right: 10px !important;
                    }
                    .reg-box {
                        width: 85% !important;
                        padding: 25px 24px !important;
                    }
                    .reg-title {
                        font-size: 18px !important;
                        margin-bottom: 24px !important;
                    }
                    .reg-input {
                        padding: 10px 14px !important;
                        font-size: 14px !important;
                        margin-bottom: 16px !important;
                    }
                    .reg-button {
                        padding: 10px !important;
                        font-size: 16px !important;
                        margin-bottom: 20px !important;
                    }
                    .reg-member-card {
                        padding: 12px !important;
                        margin-bottom: 16px !important;
                    }
                    .step-indicator-circle {
                        width: 28px !important;
                        height: 28px !important;
                        font-size: 11px !important;
                    }
                    .step-indicator-label {
                        font-size: 9px !important;
                    }
                    .step-indicator-line {
                        width: 20px !important;
                    }
                    .member-nav-circle {
                        width: 32px !important;
                        height: 32px !important;
                        font-size: 12px !important;
                    }
                    .remove-button {
                        padding: 5px 10px !important;
                        font-size: 11px !important;
                    }
                    .edit-button {
                        padding: 6px 12px !important;
                        font-size: 12px !important;
                    }
                    .success-modal-content {
                        padding: 32px 24px !important;
                    }
                    .success-icon {
                        width: 60px !important;
                        height: 60px !important;
                        font-size: 36px !important;
                    }
                    .success-title {
                        font-size: 24px !important;
                    }
                    .success-text {
                        font-size: 14px !important;
                    }
                    .success-button {
                        padding: 12px 24px !important;
                        font-size: 14px !important;
                    }
                }
            `}</style>
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                overflow: 'auto'
            }}>
                {/* Background Image */}
                <img
                    src={backgroundImage}
                    alt="Background"
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'fill',
                        zIndex: 0
                    }}
                />

                {/* Logo */}
                <img
                    src={logo}
                    alt="Core Logo"
                    className="reg-logo"
                    style={{
                        position: 'fixed',
                        top: '24px',
                        right: '24px',
                        width: '200px',
                        height: '200px',
                        objectFit: 'contain',
                        zIndex: 10
                    }}
                />

                {/* Registration Box Wrapper */}
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        minHeight: '100vh',
                        padding: '40px 20px'
                    }}
                >
                    <div
                        className="reg-box"
                        style={{
                            width: "550px",
                            maxWidth: "95%",
                            backgroundColor: "black",
                            border: "2px solid #A2886D",
                            borderRadius: "20px",
                            padding: "40px 40px",
                            boxSizing: "border-box",
                            position: "relative",
                            zIndex: 5
                        }}
                    >
                        {renderView()}
                    </div>
                </div>

                {/* Success Modal */}
                {registrationSuccess && (
                    <div
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100vw',
                            height: '100vh',
                            backgroundColor: 'rgba(0, 0, 0, 0.9)',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            zIndex: 1000,
                            animation: 'fadeIn 0.3s ease-in'
                        }}
                    >
                        <div
                            className="success-modal-content"
                            style={{
                                backgroundColor: 'black',
                                border: '3px solid #FFD6AC',
                                borderRadius: '20px',
                                padding: '48px 40px',
                                maxWidth: '500px',
                                width: '90%',
                                textAlign: 'center',
                                boxShadow: '0 0 40px rgba(255, 214, 172, 0.3)',
                                animation: 'scaleIn 0.4s ease-out'
                            }}
                        >
                            {/* Success Icon */}
                            <div
                                className="success-icon"
                                style={{
                                    width: '80px',
                                    height: '80px',
                                    margin: '0 auto 24px',
                                    borderRadius: '50%',
                                    backgroundColor: '#FFD6AC',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '48px',
                                    animation: 'checkPop 0.5s ease-out 0.3s both'
                                }}
                            >
                                ✓
                            </div>

                            <h2 className="success-title" style={{ color: COLORS.primary, fontSize: '32px', fontWeight: 'bold', marginBottom: '16px', fontFamily: FONTS.secondary, letterSpacing: '2px' }}>
                                SUCCESS!
                            </h2>
                            <p className="success-text" style={{ color: COLORS.secondary, fontSize: '18px', marginBottom: '8px', fontFamily: FONTS.primary, lineHeight: '1.6' }}>
                                Team <strong style={{ color: COLORS.primary }}>{teamName}</strong> has been registered successfully!
                            </p>
                            <p className="success-text" style={{ color: COLORS.tertiary, fontSize: '14px', marginBottom: '32px', fontFamily: FONTS.primary }}>
                                You will receive a confirmation email shortly.
                            </p>

                            <button
                                onClick={resetForm}
                                className="success-button"
                                style={getButtonStyle({ padding: '14px 32px', backgroundColor: COLORS.primary, color: 'black', fontSize: '16px', fontWeight: 'bold', fontFamily: FONTS.secondary, letterSpacing: '1px' })}
                                {...createHoverHandlers(COLORS.secondary, COLORS.primary, { transform: 'scale(1.05)' })}
                            >
                                RETURN HOME
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                @keyframes scaleIn {
                    from {
                        transform: scale(0.8);
                        opacity: 0;
                    }
                    to {
                        transform: scale(1);
                        opacity: 1;
                    }
                }
                
                @keyframes checkPop {
                    0% {
                        transform: scale(0);
                    }
                    50% {
                        transform: scale(1.2);
                    }
                    100% {
                        transform: scale(1);
                    }
                }
                
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </>
    );
}