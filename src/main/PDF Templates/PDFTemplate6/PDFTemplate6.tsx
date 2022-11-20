import {FC, Fragment, memo} from "react";
import {Page, Text, View, Document, StyleSheet, Font, Link, Image} from '@react-pdf/renderer';
import IranSanseL from '../../../assets/fonts/IRANSans/_persian-number/woff/IRANSansWeb(FaNum)_Light.woff'
import IranSanseB from '../../../assets/fonts/IRANSans/_persian-number/woff/IRANSansWeb(FaNum)_Bold.woff'
import IranSanseUL from '../../../assets/fonts/IRANSans/_persian-number/woff/IRANSansWeb(FaNum)_UltraLight.woff'
import IranSanse from '../../../assets/fonts/IRANSans/_persian-number/woff/IRANSansWeb(FaNum).woff'
import MobileIcon from '../../../assets/smartphone4.png'
import EnvelopeIcon from '../../../assets/envelope4.png'
import LocationIcon from '../../../assets/location-pin4.png'
import MedalIcon from '../../../assets/medal2.png'
import MrtarboardIcon from '../../../assets/mortarboard2.png'
import PencilAndRulerIcon from '../../../assets/pencil-and-ruler2.png'
import SuitCaseIcon from '../../../assets/suitcase2.png'
import ProfilePicture from '../../../assets/images.png'
import PersianText from "../PersianText/PersianText";
import Star from "../PDFTemplate1/Star";
import {LanguageItem} from "../../components/LanguageForm/LanguageForm";
import {SkillItem} from "../../components/SkillForm/SkillForm";
import {SocialMediaItem} from "../../components/SocialMediaForm/SocialMediaForm";
import {EducationItem} from "../../components/EducationForm/EducationForm";
import {JobExperienceItem} from "../../components/JobExperienceForm/JobExperienceForm";
import {CertificateItem} from "../../components/CertificateForm/CertificateForm";
import {ProjectItem} from "../../components/ProjectForm/ProjectForm";

Font.register( {
  family: "IranSanse",
  fonts: [
    {src: IranSanseL, fontStyle: 'light'},
    {src: IranSanseUL, fontStyle: 'ultralight'},
    {src: IranSanseB, fontStyle: 'bold'},
    {src: IranSanse, fontStyle: 'normal'},
    {src: IranSanse, fontStyle: 'lightnormal', fontWeight: 'thin'},
  ]
} );

const styles = StyleSheet.create( {
  viewer: {
    width: window.innerWidth,
    height: window.innerHeight,
  },
  page: {
    fontFamily: 'IranSanse',
    flexDirection: 'row-reverse',
  },
  rightSection: {
    paddingTop: 16,
    width: '35%',
    backgroundColor: '#ffc107',
    alignItems: 'flex-end',
  },
  leftSection: {
    paddingTop: 16,
    width: '65%',
    backgroundColor: '#fbfbfb',
  },
  pictureWrapper: {
    margin: '0 auto 8',
    width: 142,
    height: 142,
    border: 5,
    borderRadius: '50%',
    borderColor: '#fbfbfb'
  },
  picture: {
    width: 120,
    height: 120,
    margin: 'auto',
    borderRadius: '50%',
  },
  name: {
    flexDirection: 'row-reverse',
    alignSelf: 'center',
    // marginLeft: -8
  },
  position: {
    width: '100%',
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#393836',
    color: '#ffc107',
    padding: '4 0',
    alignItems: 'center'
  },
  infoItem: {
    flexDirection: 'row-reverse',
    marginBottom: 4,
  },
  infoBox: {
    borderTop: 3.2,
    borderBottom: 3.2,
    borderRight: 6,
    borderLeft: 6,
    width: 26,
    height: 8,
    margin: 'auto',
    marginLeft: 6,
    borderColor: '#393836'
  },
  contactSection: {
    width: '90%',
    marginRight: 0,
    marginLeft: 'auto',
    marginTop: 10,
    marginBottom: 10
  },
  contactItem: {
    flexDirection: 'row-reverse',
    marginBottom: 8,
  },
  contactBox: {
    width: '14%',
    // width: 26,
    height: 22,
    marginLeft: '4px',
    backgroundColor: '#393836',
  },
  contactImg: {
    margin: 'auto',
    width: 12,
    height: 12,
  },
  sideTitle: {
    width: '90%',
    padding: '2 0',
    margin: '4 auto',
    border: 1.5,
    borderColor: '#393836',
    color: '#393836',
    alignItems: 'center'
  },
  sideSection: {
    width: '90%',
    margin: '0 auto'
  },
  languageItem: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    marginTop: 4,
    marginBottom: 4,
  },
  ratingStar: {
    flexDirection: 'row',
    marginTop: 'auto',
    marginBottom: 'auto',
    backgroundColor: '#393836',
    padding: 4,
    borderRadius: 2,
    width: 58,
    color: '#ffc107'
  },
  skillPercent: {
    backgroundColor: '#393836',
    padding: '2 8',
    borderRadius: 2,
    color: '#ffc107',
    fontSize: 8,
    margin: 'auto'
  },
  link: {
    padding: 2,
    borderRadius: 4,
    fontSize: 10,
    backgroundColor: '#393836',
    color: '#ffc107',
    textDecoration: 'none',
    textAlign: 'center',
    margin: '4 0'
  },
  bio: {
    margin: '0 50 0 10',
  },
  mainTitle: {
    marginTop: 8,
    flexDirection: 'row-reverse'
  },
  titleIcon: {
    width: 54,
  },
  iconImage: {
    width: 24,
    height: 24,
    margin: 'auto',
  },
  titleText: {
    width: '100%',
    backgroundColor: '#565656',
    padding: '4 8',
    color: 'white'
  },
  mainSection: {
    margin: '0 50 8 10',
    paddingTop: 8,
  },
  projectLink: {
    flexDirection: 'row-reverse',
    fontSize: 10
  },
} )

export type Resume = {
  _id: string
  userId: string
  templateNumber: string
  basicInformation: {
    firstName: string
    lastName: string
    email: string
    address: string
    birthDate: string
    city: string
    jobTitle: string
    maritalStatus: string
    mobileNumber: string
    soldieringStatus: string
    userImageBase64: string
  },
  educationItem: EducationItem[],
  jobExperienceItem: JobExperienceItem[],
  socialMediaItem: SocialMediaItem[],
  skillItem: SkillItem[],
  languageItem: LanguageItem[],
  certificateItem: CertificateItem[],
  projectItem: ProjectItem[],
  aboutMe: {
    description: string
  }
}

interface Props {
  resume: Resume
}

const PDFTemplate6: FC<Props> = ( {resume} ) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.rightSection}>
          <View style={styles.pictureWrapper}>
            {
              resume.basicInformation.userImageBase64 &&
                resume.basicInformation.userImageBase64 !== '' ?
                <Image style={styles.picture} src={`data:image/png;base64,${resume.basicInformation.userImageBase64}`} />
                :
                <Image style={styles.picture} src={ProfilePicture} />
            }
          </View>
          {resume.basicInformation &&
            <Fragment>
              <View style={styles.name}>
                {( resume.basicInformation.lastName !== '' || resume.basicInformation.firstName !== '' ) &&
                  <View style={styles.name}>
                    {resume.basicInformation.firstName !== '' && <PersianText text={resume.basicInformation.firstName} fontStyle={"bold"} fontSize={16} marginTop={0} marginBottom={0} />}
                    {resume.basicInformation.lastName !== '' && <PersianText text={resume.basicInformation.lastName} fontStyle={"bold"} fontSize={16} marginTop={0} marginBottom={0} />}
                  </View>
                }
              </View>
              <View style={styles.position}>
                {
                  resume.basicInformation.jobTitle !== '' &&
                  <PersianText text={resume.basicInformation.jobTitle} fontStyle={"bold"} fontSize={11} marginTop={0} marginBottom={0} />
                }
              </View>
              <View style={styles.infoItem}>
                {resume.basicInformation.birthDate !== '' &&
                  <Fragment>
                    <View style={styles.infoBox} />
                    <PersianText text={`متولد: ${resume.basicInformation.birthDate}`} fontStyle={"lightnormal"} fontSize={9} marginTop={0} marginBottom={0} />
                  </Fragment>
                }
              </View>
              <View style={styles.infoItem}>
                {resume.basicInformation.maritalStatus !== '' &&
                  <Fragment>
                    <View style={styles.infoBox} />
                    <PersianText text={`وضعیت تاهل: ${resume.basicInformation.maritalStatus}`} fontStyle={"lightnormal"} fontSize={9} marginTop={0} marginBottom={0} />
                  </Fragment>
                }
              </View>
              <View style={styles.infoItem}>
                {resume.basicInformation.soldieringStatus !== '' &&
                  <Fragment>
                    <View style={styles.infoBox} />
                    <PersianText text={`وضعیت سربازی: ${resume.basicInformation.soldieringStatus}`} fontStyle={"lightnormal"} fontSize={9} marginTop={0} marginBottom={0} />
                  </Fragment>
                }
              </View>
              <View style={styles.contactSection}>
                {resume.basicInformation.email !== '' &&
                  <View style={styles.contactItem}>
                    <View style={styles.contactBox} >
                      <Image style={styles.contactImg} src={EnvelopeIcon} />
                    </View>
                    <PersianText text={resume.basicInformation.email} fontStyle={"lightnormal"} fontSize={9} marginTop={3} marginBottom={0} />
                  </View>
                }
                {resume.basicInformation.mobileNumber !== '' &&
                  <View style={styles.contactItem}>
                    <View style={styles.contactBox} >
                      <Image style={styles.contactImg} src={MobileIcon} />
                    </View>
                    <PersianText text={resume.basicInformation.mobileNumber} fontStyle={"lightnormal"} fontSize={9} marginTop={3} marginBottom={0} />
                  </View>
                }
                {( resume.basicInformation.city !== '' || resume.basicInformation.address !== '' ) &&
                  <View style={styles.contactItem}>
                    <View style={styles.contactBox}>
                      <Image style={styles.contactImg} src={LocationIcon} />
                    </View>
                    <View style={{flexDirection: 'row-reverse', width: '84%', marginRight: '4px', marginLeft: 'auto'}}>
                      {/* <PersianText text={`${resume.basicInformation.city !== '' && resume.basicInformation.city}${resume.basicInformation.city !== '' && resume.basicInformation.address !== '' && ' - '}${resume.basicInformation.address !== '' && resume.basicInformation.address}`} fontStyle={"lightnormal"} fontSize={9} marginTop={3} marginBottom={0} /> */}
                      {/* <View style={{flexDirection: 'row-reverse', }}> */}
                      {resume.basicInformation.city !== '' && <PersianText text={resume.basicInformation.city} fontStyle={"lightnormal"} fontSize={9} marginTop={3} marginBottom={0} />}
                      {resume.basicInformation.city !== '' && resume.basicInformation.address !== '' && <PersianText text={'- '} fontStyle={"lightnormal"} fontSize={9} marginTop={3} marginBottom={0} />}
                      {resume.basicInformation.address !== '' && <PersianText text={`${resume.basicInformation.address}`} fontStyle={"lightnormal"} fontSize={9} marginTop={3} marginBottom={0} />}
                      {/* </View> */}
                    </View>
                  </View>
                }
              </View>
            </Fragment>
          }
          {
            resume.languageItem.length !== 0 &&
            ( <Fragment>
              <View style={styles.sideTitle}>
                <PersianText text={"زبان"} fontStyle={"bold"} fontSize={12} marginTop={0} marginBottom={0} />
              </View>
              <View style={styles.sideSection}>
                {
                  resume.languageItem.map( ( languageItem: LanguageItem, i: number ) => {
                    return (
                      <View key={i} style={styles.languageItem}>
                        <PersianText text={languageItem.languageName} fontStyle={"normal"} fontSize={11} marginTop={0} marginBottom={0} />
                        {
                          languageItem.level === 'زبان مادری' ?
                            <View style={styles.ratingStar}>
                              <View style={{width: '100%', alignItems: 'center', marginLeft: -2}}>
                                <PersianText text={'زبان مادری'} fontStyle={"normal"} fontSize={9} marginTop={0} marginBottom={0} />
                              </View>
                            </View>
                            :
                            languageItem.level === 'مبتدی' ?
                              <View style={styles.ratingStar}>
                                <Star color="#ffc107" />
                              </View>
                              :
                              languageItem.level === 'پایین تر متوسط' ?
                                <View style={styles.ratingStar}><Star color="#ffc107" /><Star color="#ffc107" /></View>
                                :
                                languageItem.level === 'متوسط' ?
                                  <View style={styles.ratingStar}><Star color="#ffc107" /><Star color="#ffc107" /><Star color="#ffc107" /></View>
                                  :
                                  languageItem.level === 'بالا تر از متوسط' ?
                                    <View style={styles.ratingStar}><Star color="#ffc107" /><Star color="#ffc107" /><Star color="#ffc107" /><Star color="#ffc107" /></View>
                                    :
                                    languageItem.level === 'پیشرفته' ?
                                      <View style={styles.ratingStar}><Star color="#ffc107" /><Star color="#ffc107" /><Star color="#ffc107" /><Star color="#ffc107" /><Star color="#ffc107" /></View>
                                      :
                                      <Fragment></Fragment>
                        }
                      </View>
                    )
                  } )
                }
              </View>
            </Fragment> )
          }
          {
            resume.skillItem.length !== 0 &&
            resume.skillItem.map( ( skillItem: SkillItem, i: number ) => {
              return (
                <View style={{width: '100%'}} key={i} wrap={false}>
                  {i === 0 &&
                    <View style={styles.sideTitle}>
                      <PersianText text={"مهارت ها"} fontStyle={"bold"} fontSize={12} marginTop={0} marginBottom={0} />
                    </View>}
                  <View style={styles.sideSection}>
                    <View style={styles.languageItem}>
                      <PersianText text={skillItem.skillName} fontStyle={"normal"} fontSize={10} marginTop={0} marginBottom={0} />
                      {
                        skillItem.level === 'درحال یادگیری' ?
                          <View>
                            <Text style={styles.skillPercent}>20%</Text>
                          </View>
                          :
                          skillItem.level === 'کم تجربه' ?
                            <View>
                              <Text style={styles.skillPercent}>40%</Text>
                            </View>
                            :
                            skillItem.level === 'تسلط نسبی' ?
                              <View>
                                <Text style={styles.skillPercent}>60%</Text>
                              </View>
                              :
                              skillItem.level === 'تسلط کامل' ?
                                <View>
                                  <Text style={styles.skillPercent}>80%</Text>
                                </View>
                                :
                                skillItem.level === 'حرفه ای' ?
                                  <View>
                                    <Text style={styles.skillPercent}>100%</Text>
                                  </View>
                                  :
                                  <Fragment></Fragment>
                      }
                    </View>
                  </View>
                </View>
              )
            } )
          }
          {
            resume.socialMediaItem.length !== 0 &&
            resume.socialMediaItem.map( ( socialMediaItem: SocialMediaItem, i: number ) => {
              return (
                <View style={{width: '100%'}} key={i} wrap={false}>
                  {i === 0 &&
                    <View style={styles.sideTitle}>
                      <PersianText text={"شبکه های اجتماعی"} fontStyle={"bold"} fontSize={12} marginTop={0} marginBottom={0} />
                    </View>}
                  <View style={styles.sideSection}>
                    <Link style={styles.link} src={socialMediaItem.link}>
                      <Text>{socialMediaItem.title}</Text>
                    </Link>
                  </View>
                </View>
              )
            } )
          }
        </View>
        <View style={styles.leftSection}>
          <View>
            {
              resume.aboutMe && resume.aboutMe.description !== '' &&
              <View style={styles.bio}>
                {resume.aboutMe.description.split( '\n' ).map( ( line: string, i: number ) => <PersianText key={i} text={line} fontStyle={"light"} fontSize={10} marginTop={0} marginBottom={0} /> )}
              </View>
            }
          </View>
          {
            resume.educationItem.length !== 0 &&
            resume.educationItem.map( ( educationItem: EducationItem, i: number ) => {
              return (
                <View key={i} wrap={false}>
                  {i === 0 &&
                    <View style={styles.mainTitle}>
                      <View style={styles.titleIcon}>
                        <Image style={styles.iconImage} src={MrtarboardIcon} />
                      </View>
                      <View style={styles.titleText}>
                        <PersianText text={"سوابق تحصیلی"} fontStyle={"bold"} fontSize={12} marginTop={0} marginBottom={0} />
                      </View>
                    </View>}
                  <View style={styles.mainSection}>
                    <PersianText text={`${educationItem.degree} ${educationItem.study}`} fontStyle={"bold"} fontSize={10} marginTop={0} marginBottom={0} />
                    <PersianText text={educationItem.university} fontStyle={"lightnormal"} fontSize={10} marginTop={2} marginBottom={0} />
                    <PersianText text={`${educationItem.startDate}${educationItem.startDate && educationItem.endDate && ' - '}${educationItem.endDate}`} fontStyle={"ultralight"} fontSize={9} marginTop={2} marginBottom={0} />
                  </View>
                </View>
              )
            } )
          }
          {
            resume.jobExperienceItem.length !== 0 &&
            resume.jobExperienceItem.map( ( jobExperienceItem: JobExperienceItem, i: number ) => {
              return (
                <View key={i} wrap={false}>
                  {i === 0 &&
                    <View style={styles.mainTitle}>
                      <View style={styles.titleIcon}>
                        <Image style={styles.iconImage} src={SuitCaseIcon} />
                      </View>
                      <View style={styles.titleText}>
                        <PersianText text={"سوابق شغلی"} fontStyle={"bold"} fontSize={12} marginTop={0} marginBottom={0} />
                      </View>
                    </View>}
                  <View style={styles.mainSection}>
                    <PersianText text={jobExperienceItem.jobPosition} fontStyle={"bold"} fontSize={10} marginTop={0} marginBottom={0} />
                    <PersianText text={jobExperienceItem.companyName} fontStyle={"lightnormal"} fontSize={10} marginTop={2} marginBottom={0} />
                    <PersianText text={`${jobExperienceItem.startDate}${jobExperienceItem.startDate && jobExperienceItem.endDate && ' - '}${jobExperienceItem.endDate}`} fontStyle={"ultralight"} fontSize={9} marginTop={2} marginBottom={0} />
                  </View>
                </View>
              )
            } )
          }
          {
            resume.certificateItem.length !== 0 &&
            resume.certificateItem.map( ( certificateItem: CertificateItem, i: number ) => {
              return (
                <View key={i} wrap={false}>
                  {i === 0 &&
                    <View style={styles.mainTitle}>
                      <View style={styles.titleIcon}>
                        <Image style={styles.iconImage} src={MedalIcon} />
                      </View>
                      <View style={styles.titleText}>
                        <PersianText text={"دوره ها و گواهینامه ها"} fontStyle={"bold"} fontSize={12} marginTop={0} marginBottom={0} />
                      </View>
                    </View>}
                  <View style={styles.mainSection}>
                    <PersianText text={certificateItem.certificateName} fontStyle={"bold"} fontSize={10} marginTop={0} marginBottom={0} />
                    <PersianText text={certificateItem.institution} fontStyle={"lightnormal"} fontSize={10} marginTop={2} marginBottom={0} />
                    <PersianText text={`${certificateItem.startDate}${certificateItem.startDate && certificateItem.endDate && ' - '}${certificateItem.endDate}`} fontStyle={"ultralight"} fontSize={9} marginTop={2} marginBottom={0} />
                  </View>
                </View>
              )
            } )
          }
          {
            resume.projectItem.length !== 0 &&
            resume.projectItem.map( ( projectItem: ProjectItem, i: number ) => {
              return (
                <View key={i} wrap={false}>
                  {i === 0 &&
                    <View style={styles.mainTitle}>
                      <View style={styles.titleIcon}>
                        <Image style={styles.iconImage} src={PencilAndRulerIcon} />
                      </View>
                      <View style={styles.titleText}>
                        <PersianText text={"پروژه ها"} fontStyle={"bold"} fontSize={12} marginTop={0} marginBottom={0} />
                      </View>
                    </View>
                  }
                  <View style={styles.mainSection}>
                    <PersianText text={`${projectItem.title}${projectItem.title && projectItem.employer && ' - '}${projectItem.employer}`} fontStyle={"normal"} fontSize={11} marginTop={0} marginBottom={0} />
                    <PersianText text={`${projectItem.startDate}${projectItem.startDate && projectItem.endDate && ' - '}${projectItem.endDate}`} fontStyle={"ultralight"} fontSize={9} marginTop={2} marginBottom={0} />
                    {projectItem.description && projectItem.description !== '' &&
                      <Fragment>
                        <PersianText text={'توضیحات:'} fontStyle={"normal"} fontSize={10} marginTop={4} marginBottom={0} />
                        {projectItem.description && projectItem.description.split( '\n' ).map( ( line: string, i: number ) => <PersianText key={i} text={line} fontStyle={"light"} fontSize={10} marginTop={1} marginBottom={0} /> )}
                      </Fragment>
                    }
                    {projectItem.link && projectItem.link !== '' &&
                      <Fragment>
                        <PersianText text={`لینک پروژه:`} fontStyle={"normal"} fontSize={10} marginTop={4} marginBottom={0} />
                        <Link style={styles.projectLink} src={projectItem.link}>
                          <Text>{projectItem.link}</Text>
                        </Link>
                      </Fragment>
                    }
                  </View>
                </View>
              )
            } )
          }
        </View>
      </Page>
    </Document>
  )
};

export default memo( PDFTemplate6 );
