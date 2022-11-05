import {FC, Fragment} from "react";
import {Page, Text, View, Document, StyleSheet, Font, Link, Image} from '@react-pdf/renderer';
import IranSanseL from '../../../assets/fonts/IRANSans/_persian-number/ttf/IRANSansWeb(FaNum)_Light.ttf'
import IranSanseB from '../../../assets/fonts/IRANSans/_persian-number/ttf/IRANSansWeb(FaNum)_Bold.ttf'
import IranSanseUL from '../../../assets/fonts/IRANSans/_persian-number/ttf/IRANSansWeb(FaNum)_UltraLight.ttf'
import IranSanse from '../../../assets/fonts/IRANSans/_persian-number/ttf/IRANSansWeb(FaNum).ttf'
import MobileIcon from '../../../assets/smartphone3.png'
import EnvelopeIcon from '../../../assets/envelope3.png'
import LocationIcon from '../../../assets/location-pin3.png'
import LanguageIcon from '../../../assets/language.png'
import LampIcon from '../../../assets/lamp.png'
import LinkIcon from '../../../assets/link.png'
import MedalIcon from '../../../assets/medal.png'
import MrtarboardIcon from '../../../assets/mortarboard.png'
import PencilAndRulerIcon from '../../../assets/pencil-and-ruler.png'
import SuitCaseIcon from '../../../assets/suitcase.png'
import UserIcon from '../../../assets/user.png'
import ProfilePicture from '../../../assets/images.png'
import PersianText from "../PersianText/PersianText";
import Star from "../PDFTemplate1/Star";
import {EducationItem} from "../EducationForm/EducationForm";
import {JobExperienceItem} from "../JobExperienceForm/JobExperienceForm";
import {CertificateItem} from "../CertificateForm/CertificateForm";
import {LanguageItem} from "../LanguageForm/LanguageForm";
import {SkillItem} from "../SkillForm/SkillForm";
import {SocialMediaItem} from "../SocialMediaForm/SocialMediaForm";
import {ProjectItem} from "../ProjectForm/ProjectForm";
import {Resume} from "../PDFTemplate6/PDFTemplate6";

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
    flexDirection: 'row-reverse'
  },
  rightSection: {
    width: '33%',
    backgroundColor: '#e8e8e8',
    alignItems: 'flex-end'
  },
  leftSection: {
    width: '67%',
    marginTop: 43,
  },
  name: {
    // justifyContent: 'center',
    flexDirection: 'row-reverse',
    color: '#d62246'
  },
  rect: {
    width: '84%',
    height: 23,
    backgroundColor: '#d62246',
    position: 'relative',
    right: 0
  },
  profilrPictureWrapper: {
    width: '84%',
    marginTop: 20,
    marginBottom: 20,
    position: 'relative',
    right: 0
  },
  profilePicture: {
    width: 100,
    height: 100,
  },
  contact: {
    width: '84%',
    backgroundColor: 'white',
    position: 'relative',
    right: 0,
    padding: 8,
    marginBottom: 10
  },
  contactICon: {
    width: 10,
    height: 10,
    color: '#007baa',
    margin: '2 0 auto 8',
  },
  title: {
    flexDirection: 'row-reverse',
    marginRight: 12,
    marginTop: 16
  },
  titleIcon: {
    width: 22,
    height: 22,
    borderRadius: '50%',
    backgroundColor: '#d62246',
    marginLeft: 8
  },
  titleIconImage: {
    width: 10,
    height: 10,
    margin: 'auto'
    // padding: 4
  },
  titleBorder: {
    flexDirection: 'row-reverse',
    marginRight: 12,
    marginTop: 6,
    // marginBottom: 8,
  },
  titleTextBorder: {
    height: 1.5,
    width: '70%',
    backgroundColor: '#c5c5c5'
  },
  titleIconBorder: {
    alignSelf: 'flex-end',
    width: 24,
    height: 3,
    marginTop: -0.75,
    backgroundColor: '#d62246'
  },
  languageItem: {
    width: '100%',
    padding: '0 12',
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    // marginBottom: 8,
    marginTop: 8
  },
  ratingStar: {
    flexDirection: 'row',
    marginTop: 'auto',
    marginBottom: 'auto'
  },
  skillsItem: {
    padding: '2 6 1 3',
    border: 1,
    borderColor: '#979797',
    borderRadius: 2,
    marginLeft: 4,
    marginBottom: 2,
    fontSize: 10,
  },
  link: {
    padding: '2 6',
    borderRadius: 4,
    // marginBottom: 10,
    fontSize: 10,
    backgroundColor: '#d62246',
    color: 'white',
    textDecoration: 'none',
    textAlign: 'center',
    // margin: '4 0'
  },
  basicInfo: {
    backgroundColor: '#e8e8e8',
    padding: '8 16',
  },
  position: {
    flexDirection: 'row-reverse',
    color: '#575757',
    marginTop: 8,
  },
  section: {
    marginBottom: 12,
    marginTop: 8,
    marginRight: 12,
    marginLeft: 20,
  },
  projectItem: {
    marginBottom: 12
  },
  projectLink: {
    flexDirection: 'row-reverse',
    fontSize: 10
  },
} )

interface Props {
  resume: Resume
}


const PDFTemplate5: FC<Props> = ( {resume} ) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.rightSection}>
          <View style={styles.rect}></View>
          <View style={styles.profilrPictureWrapper}>
            {
              resume.basicInformation &&
                resume.basicInformation.userImageBase64 ?
                <Image src={`data:image/png;base64,${resume.basicInformation.userImageBase64}`} style={styles.profilePicture} />
                :
                <Image src={ProfilePicture} style={styles.profilePicture} />
            }
          </View>
          {resume.basicInformation && ( resume.basicInformation.email !== '' || resume.basicInformation.mobileNumber !== '' || resume.basicInformation.address !== '' || resume.basicInformation.city !== '' ) &&
            <View style={styles.contact}>
              {
                resume.basicInformation.email !== '' &&
                <View style={{flexDirection: 'row-reverse', marginBottom: 4}}>
                  <Image style={styles.contactICon} src={EnvelopeIcon} />
                  <PersianText text={resume.basicInformation.email} fontStyle={"lightnormal"} fontSize={8} marginTop={1} marginBottom={0} />
                </View>
              }
              {
                resume.basicInformation.mobileNumber !== '' &&
                <View style={{flexDirection: 'row-reverse', marginBottom: 4}}>
                  <Image style={styles.contactICon} src={MobileIcon} />
                  <PersianText text={resume.basicInformation.mobileNumber} fontStyle={"lightnormal"} fontSize={8} marginTop={1} marginBottom={0} />
                </View>
              }
              {
                ( resume.basicInformation.city !== '' || resume.basicInformation.address !== '' ) &&
                <View style={{flexDirection: 'row-reverse', }}>
                  <Image style={styles.contactICon} src={LocationIcon} />
                  <PersianText text={`${resume.basicInformation.city !== '' && resume.basicInformation.city}${resume.basicInformation.city !== '' && resume.basicInformation.address !== '' && ' - '}${resume.basicInformation.address !== '' && resume.basicInformation.address}`} fontStyle={"lightnormal"} fontSize={8} marginTop={1} marginBottom={0} />
                </View>
              }
            </View>
          }
          {
            resume.languageItem.length !== 0 &&
            <View style={{width: '100%'}}>
              <View style={styles.title}>
                <View style={styles.titleIcon}>
                  <Image src={LanguageIcon} style={styles.titleIconImage} />
                </View>
                <PersianText text={'زبان'} fontStyle={"bold"} fontSize={10} marginTop={4} marginBottom={0} />
              </View>
              <View style={styles.titleBorder}>
                <View style={styles.titleIconBorder} />
                <View style={styles.titleTextBorder} />
              </View>
              {
                resume.languageItem.map( ( languageItem: LanguageItem, i: number ) => {
                  return (
                    <View key={i} style={styles.languageItem}>
                      <PersianText text={languageItem.languageName} fontStyle={"lightnormal"} fontSize={10} marginTop={0} marginBottom={-2} />
                      <View style={styles.ratingStar}>
                        {
                          languageItem.level === 'زبان مادری' ?
                            <View style={{alignItems: 'center', marginLeft: -2, color: '#333333'}}>
                              <PersianText text={'زبان مادری'} fontStyle={"normal"} fontSize={9} marginTop={0} marginBottom={0} />
                            </View>
                            :
                            languageItem.level === 'مبتدی' ?
                              <Star color='#333333' />
                              :
                              languageItem.level === 'پایین تر متوسط' ?
                                <Fragment><Star color='#333333' /><Star color='#333333' /></Fragment>
                                :
                                languageItem.level === 'متوسط' ?
                                  <Fragment><Star color='#333333' /><Star color='#333333' /><Star color='#333333' /></Fragment>
                                  :
                                  languageItem.level === 'بالا تر از متوسط' ?
                                    <Fragment><Star color='#333333' /><Star color='#333333' /><Star color='#333333' /><Star color='#333333' /></Fragment>
                                    :
                                    languageItem.level === 'پیشرفته' ?
                                      <Fragment><Star color='#333333' /><Star color='#333333' /><Star color='#333333' /><Star color='#333333' /><Star color='#333333' /></Fragment>
                                      :
                                      <Fragment></Fragment>
                        }
                      </View>
                    </View>
                  )
                } )
              }
            </View>
          }
          {
            resume.skillItem.length !== 0 &&
            <View style={{width: '100%'}} wrap={false}>
              <View style={styles.title}>
                <View style={styles.titleIcon}>
                  <Image src={LampIcon} style={styles.titleIconImage} />
                </View>
                <PersianText text={'مهارت ها'} fontStyle={"bold"} fontSize={10} marginTop={4} marginBottom={0} />
              </View>
              <View style={styles.titleBorder}>
                <View style={styles.titleIconBorder} />
                <View style={styles.titleTextBorder} />
              </View>
              <View style={{flexDirection: 'row-reverse', flexWrap: 'wrap', marginRight: 12, marginTop: 8}}>
                {
                  resume.skillItem.map( ( skillItem: SkillItem, i: number ) => {
                    return (
                      <View key={i} style={styles.skillsItem}>
                        <PersianText text={skillItem.skillName} fontStyle={"normal"} fontSize={10} marginTop={0} marginBottom={0} />
                      </View>
                    )
                  } )
                }
              </View>
            </View>
          }
          {resume.socialMediaItem.length !== 0 &&
            resume.socialMediaItem.map( ( socialMediaItem: SocialMediaItem, i: number ) => {
              return (
                <View key={i} wrap={false}>
                  {i === 0 &&
                    <Fragment>
                      <View style={styles.title}>
                        <View style={styles.titleIcon}>
                          <Image src={LinkIcon} style={styles.titleIconImage} />
                        </View>
                        <PersianText text={'شبکه های اجتماعی'} fontStyle={"bold"} fontSize={10} marginTop={4} marginBottom={0} />
                      </View>
                      <View style={styles.titleBorder}>
                        <View style={styles.titleIconBorder} />
                        <View style={styles.titleTextBorder} />
                      </View>
                    </Fragment>
                  }
                  <View style={{marginRight: 12, marginLeft: 'auto', fontSize: 10, marginTop: 8}}>
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
          {
            resume.basicInformation &&
            <View style={styles.basicInfo}>
              {( resume.basicInformation.lastName !== '' || resume.basicInformation.firstName !== '' ) &&
                <View style={styles.name}>
                  {resume.basicInformation.firstName !== '' && <PersianText text={resume.basicInformation.firstName} fontStyle={"bold"} fontSize={20} marginTop={0} marginBottom={0} />}
                  {resume.basicInformation.lastName !== '' && <PersianText text={resume.basicInformation.lastName} fontStyle={"bold"} fontSize={20} marginTop={0} marginBottom={0} />}
                </View>
              }
              {
                resume.basicInformation.jobTitle !== '' &&
                <View style={styles.position}>
                  <View style={{width: 40, height: 2, backgroundColor: '#8f8e93', margin: 'auto 0 auto 12'}} />
                  <PersianText text={resume.basicInformation.jobTitle} fontStyle={"lightnormal"} fontSize={13} marginTop={0} marginBottom={0} />
                </View>
              }
              <View style={{flexDirection: 'row-reverse', marginTop: 4}}>
                {
                  resume.basicInformation.birthDate !== '' &&
                  <View style={{marginLeft: 12}}>
                    <PersianText text={`متولد: ${resume.basicInformation.birthDate}`} fontStyle={"light"} fontSize={9} marginTop={8} marginBottom={0} />
                  </View>
                }
                {
                  resume.basicInformation.maritalStatus !== '' &&
                  <View style={{marginLeft: 12}}>
                    <PersianText text={`وضعیت تاهل: ${resume.basicInformation.maritalStatus}`} fontStyle={"light"} fontSize={9} marginTop={8} marginBottom={0} />
                  </View>
                }
                {
                  resume.basicInformation.soldieringStatus !== '' &&
                  <View>
                    <PersianText text={`وضعیت سربازی: ${resume.basicInformation.soldieringStatus}`} fontStyle={"light"} fontSize={9} marginTop={8} marginBottom={0} />
                  </View>
                }
              </View>
            </View>}
          <View>
            {
              resume.aboutMe && resume.aboutMe.description !== '' &&
              <View>
                <View style={styles.title}>
                  <View style={styles.titleIcon}>
                    <Image src={UserIcon} style={styles.titleIconImage} />
                  </View>
                  <PersianText text={'درباره من'} fontStyle={"bold"} fontSize={10} marginTop={4} marginBottom={0} />
                </View>
                <View style={styles.titleBorder}>
                  <View style={styles.titleIconBorder} />
                  <View style={styles.titleTextBorder} />
                </View>
                <View style={styles.section}>
                  {resume.aboutMe.description.split( '\n' ).map( ( line: string, i: number ) => <PersianText key={i} text={line} fontStyle={"lightnormal"} fontSize={10} marginTop={0} marginBottom={0} /> )}
                </View>
              </View>
            }
          </View>
          {
            resume.educationItem.length !== 0 &&
            resume.educationItem.map( ( educationItem: EducationItem, i: number ) => {
              return (
                <View key={i} wrap={false}>
                  {i === 0 &&
                    <View>
                      <View style={styles.title}>
                        <View style={styles.titleIcon}>
                          <Image src={MrtarboardIcon} style={styles.titleIconImage} />
                        </View>
                        <PersianText text={'سوابق تحصیلی'} fontStyle={"bold"} fontSize={10} marginTop={4} marginBottom={0} />
                      </View>
                      <View style={styles.titleBorder}>
                        <View style={styles.titleIconBorder} />
                        <View style={styles.titleTextBorder} />
                      </View>
                    </View>
                  }
                  <View style={styles.section}>
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
                    <View>
                      <View style={styles.title}>
                        <View style={styles.titleIcon}>
                          <Image src={SuitCaseIcon} style={styles.titleIconImage} />
                        </View>
                        <PersianText text={'سوابق شغلی'} fontStyle={"bold"} fontSize={10} marginTop={4} marginBottom={0} />
                      </View>
                      <View style={styles.titleBorder}>
                        <View style={styles.titleIconBorder} />
                        <View style={styles.titleTextBorder} />
                      </View>
                    </View>
                  }
                  <View style={styles.section}>
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
                    <View>
                      <View style={styles.title}>
                        <View style={styles.titleIcon}>
                          <Image src={MedalIcon} style={styles.titleIconImage} />
                        </View>
                        <PersianText text={'دوره ها و گواهینامه ها'} fontStyle={"bold"} fontSize={10} marginTop={4} marginBottom={0} />
                      </View>
                      <View style={styles.titleBorder}>
                        <View style={styles.titleIconBorder} />
                        <View style={styles.titleTextBorder} />
                      </View>
                    </View>
                  }
                  <View style={styles.section}>
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
                    <View>
                      <View style={styles.title}>
                        <View style={styles.titleIcon}>
                          <Image src={PencilAndRulerIcon} style={styles.titleIconImage} />
                        </View>
                        <PersianText text={'پروژه ها'} fontStyle={"bold"} fontSize={10} marginTop={4} marginBottom={0} />
                      </View>
                      <View style={styles.titleBorder}>
                        <View style={styles.titleIconBorder} />
                        <View style={styles.titleTextBorder} />
                      </View>
                    </View>
                  }
                  <View style={styles.section}>
                    <PersianText text={`${projectItem.title}${projectItem.title && projectItem.employer && ' - '}${projectItem.employer}`} fontStyle={"normal"} fontSize={11} marginTop={0} marginBottom={0} />
                    <PersianText text={`${projectItem.startDate}${projectItem.startDate && projectItem.endDate && ' - '}${projectItem.endDate}`} fontStyle={"ultralight"} fontSize={9} marginTop={2} marginBottom={0} />
                    {projectItem.description &&
                      <Fragment>
                        <PersianText text={'توضیحات:'} fontStyle={"normal"} fontSize={10} marginTop={4} marginBottom={0} />
                        {projectItem.description && projectItem.description.split( '\n' ).map( ( line: string, i: number ) => <PersianText key={i} text={line} fontStyle={"light"} fontSize={10} marginTop={1} marginBottom={0} /> )}
                      </Fragment>
                    }
                    {projectItem.link &&
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
    </Document >
  )
};

export default PDFTemplate5;
